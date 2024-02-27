

const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');

const catchAssyncErrors = require('../middlewares/catchAsyncErrors');

const sendToken = require('../utils/jwtToken')


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
exports.forgotPassword=catchAssyncErrors(async(rey,res,next)=>{

    const user=await User.findOne({email:req})
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