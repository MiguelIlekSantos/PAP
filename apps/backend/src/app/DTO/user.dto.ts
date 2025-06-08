import * as Joi from 'joi';

export const CreateUserDto = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  }),
  permissions: Joi.string().required().messages({
    'string.empty': 'Permissions is required',
    'any.required': 'Permissions is required'
  }),
  role: Joi.string().required().messages({
    'string.empty': 'Role is required',
    'any.required': 'Role is required'
  }),
  active: Joi.boolean().required().messages({
    'boolean.base': 'Active must be a boolean',
    'any.required': 'Active is required'
  })
});

export const UpdateUserDto = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address'
  }),
  password: Joi.string().min(6).optional().messages({
    'string.min': 'Password must be at least 6 characters long'
  }),
  permissions: Joi.string().optional(),
  role: Joi.string().optional(),
  active: Joi.boolean().optional().messages({
    'boolean.base': 'Active must be a boolean'
  })
});

export const DeleteUserDto = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
});