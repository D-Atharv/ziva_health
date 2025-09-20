import Joi from "joi";

export function validateBody<T>(schema: Joi.ObjectSchema<T>, body: any): T {
  const { error, value } = schema.validate(body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) throw new Error(error.details.map((d) => d.message).join(", "));
  return value;
}

export function validateParams<T>(schema: Joi.ObjectSchema<T>, params: any): T {
  const { error, value } = schema.validate(params, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) throw new Error(error.details.map((d) => d.message).join(", "));
  return value;
}
