import Joi from "joi";

export const registerValidator = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const createEventValidator = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  dateTime: Joi.date().iso().required(),
  location: Joi.string().min(3).max(200).required(),
  maxCapacity: Joi.number().integer().min(1).required(),
});

export const updateEventValidator = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(10).max(1000),
  dateTime: Joi.date().iso(),
  location: Joi.string().min(3).max(200),
  maxCapacity: Joi.number().integer().min(1),
}).min(1);

export const eventIdParamValidator = Joi.object({
  eventId: Joi.number().integer().required(),
});

export const userIdParamValidator = Joi.object({
  userId: Joi.number().integer().required(),
});
