const Joi = require 'joi';

const clientSchema = Joi.object({
  name.string().required(),
  domain.string().required(),
  primaryColor.string().required(),
  secondaryColor.string().required(),
  logo.string().uri().required(),
  features.object({
    loyalty.boolean().required(),
    onlineOrdering.boolean().required(),
    tableReservations.boolean().required(),
  }).required(),
});

const validateClientData = (data) => {
  const { error } = clientSchema.validate(data, { abortEarly });
  if (error) {
    return error.details.map((err) => err.message);
  }
  return [];
};