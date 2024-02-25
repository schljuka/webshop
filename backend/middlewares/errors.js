const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPEMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err }

        error.message = err.message

        // Wrong Mongoose Object ID Error
        if (err.name === 'CastError') {
            const message = `Respurce not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400);
        }

        // Hamdling Mongoose Validation Error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'

        })
    }
}