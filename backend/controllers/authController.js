

const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');

const catchAssyncErrors = require('../middlewares/catchAsyncErrors');

const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')

const crypto = require('crypto')



// Register a user    /api/v1/register

exports.registerUser = catchAssyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/ncwts2xhrxykezekxd3z.jpg',
            url: 'https://res.cloudinary.com/dv68tylux/image/upload/v1708952755/avatars/ncwts2xhrxykezekxd3z.jpg'
        }
    })

    sendToken(user, 200, res)

})



// Login user    /api/v1/login

exports.loginUser = catchAssyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }


    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }


    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 200, res)

})

// Forgot Password   /api/v1/password/forgot
exports.forgotPassword = catchAssyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email })


    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });


    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\n If you have not requested this email, then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {

        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
})


// Reset Password   /api/v1/password/reset/:token
exports.resetPassword = catchAssyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

})



// Get currently logged in user details   /api/v1/me

exports.getUserProfile = catchAssyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        succes: true,
        user
    })

})


// Update / change password    api/v1/password/update

exports.updatePassword = catchAssyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);

})


// Update user profile    /api/v1/me/update

exports.updateProfile = catchAssyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Update avatar : TODO



    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        succes: true
    })

})




// Logout user   /api/v1/logout

exports.logout = catchAssyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(0),
        httpOnly: true
    })

    res.status(200).json({
        succes: true,
        message: 'Logged out'
    })
})


// Admin Routes

// Gett all users    /api/v1/admin/users

exports.allUsers = catchAssyncErrors(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})


// Get user details   /api/v1/admin/user/:id
exports.getUserDetails = catchAssyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        user
    })

})
