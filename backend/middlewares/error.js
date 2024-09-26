

class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Handle duplicate key error (for unique fields)
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered!`;
        err = new ErrorHandler(message, 400);
    }

    // Handle JWT errors
    if (err.name === "JsonWebTokenError") {
        const message = `JSON Web Token is invalid. Try again!`;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
        const message = `JSON Web Token is expired. Try logging in again!`;
        err = new ErrorHandler(message, 400);
    }

    // Handle cast errors (e.g., invalid MongoDB ObjectID)
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}!`;
        err = new ErrorHandler(message, 400);
    }

    console.log(err);

    // If Mongoose validation errors exist, map and join them into a single message
    const errorMessage = err.errors 
        ? Object.values(err.errors).map(error => error.message).join(", ")
        : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export default ErrorHandler;
