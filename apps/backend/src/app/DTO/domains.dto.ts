import * as Joi from 'joi';

export const CreateDomainsDto = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  type: Joi.string().required().messages({
    'string.empty': 'Type is required',
    'any.required': 'Type is required'
  }),
  registrator: Joi.string().required().messages({
    'string.empty': 'Registrator is required',
    'any.required': 'Registrator is required'
  }),
  expirationDate: Joi.date().required().messages({
    'date.base': 'Expiration date must be a valid date',
    'any.required': 'Expiration date is required'
  }),
  hosting: Joi.string().required().messages({
    'string.empty': 'Hosting is required',
    'any.required': 'Hosting is required'
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  })
});

export const UpdateDomainsDto = Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  registrator: Joi.string().optional(),
  expirationDate: Joi.date().optional().messages({
    'date.base': 'Expiration date must be a valid date'
  }),
  hosting: Joi.string().optional(),
  status: Joi.string().optional()
});

export const DeleteDomainsDto = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
});