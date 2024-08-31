const { Request, Response, NextFunction } = require 'express';
const Joi = require 'joi';

const validate = (schema.ObjectSchema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message.details[0].message });
    }
    next();
  };
};