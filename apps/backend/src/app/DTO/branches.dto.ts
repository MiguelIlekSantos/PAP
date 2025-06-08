import * as Joi from 'joi';

export const CreateBranchesDto = Joi.object({
  address: Joi.string().required().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required'
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Phone is required',
    'any.required': 'Phone is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  purpose: Joi.string().required().messages({
    'string.empty': 'Purpose is required',
    'any.required': 'Purpose is required'
  }),
  enterpriseId: Joi.number().integer().positive().required().messages({
    'number.base': 'Enterprise ID must be a number',
    'number.integer': 'Enterprise ID must be an integer',
    'number.positive': 'Enterprise ID must be positive',
    'any.required': 'Enterprise ID is required'
  })
});

export const UpdateBranchesDto = Joi.object({
  address: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address'
  }),
  purpose: Joi.string().optional(),
  enterpriseId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Enterprise ID must be a number',
    'number.integer': 'Enterprise ID must be an integer',
    'number.positive': 'Enterprise ID must be positive'
  })
});

export const DeleteBranchesDto = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
});