const { Request, Response, NextFunction } = require('express');
const logger = require('./logger');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  // This function is now handled directly in server.js
  next(err);
};

module.exports = {
  AppError,
  errorHandler
};