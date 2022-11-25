import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': 'All fields must be filled',
});

export default loginSchema;
