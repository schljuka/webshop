

const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');

const catchAssyncErrors = require('../middlewares/catchAsyncErrors');


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

    res.status(200).json({
        success: true,
        user
    })


})