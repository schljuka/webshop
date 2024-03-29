const catchAsyncError = require('../middlewares/catchAsyncErrors')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


// Process stripe payments   /api1/v1/payment/process

exports.processPayment = catchAsyncError(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'eur',

        metadata: { integration_check: 'accept_a_payment' }
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})



// Send stripe API key   /api1/v1/stripeapi

exports.sendStripeApi = catchAsyncError(async (req, res, next) => {


    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})