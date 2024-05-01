const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong mongodb ID error
  if (err.name === "CastError") {
    const message = `Resource not founD. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate  ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `JSON  Web Token is Invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = `JSON  Web Token is Expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    status: false,
    // error: err.stack,
    message: err.message,
  });
};
