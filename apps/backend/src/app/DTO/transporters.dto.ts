import * as Joi from 'joi';

export const CreateTransportersDto = Joi.object({
  vehicleType: Joi.string().required().messages({
    'string.empty': 'Vehicle type is required',
    'any.required': 'Vehicle type is required'
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  }),
  extEnterprise: Joi.string().required().messages({
    'string.empty': 'External enterprise is required',
    'any.required': 'External enterprise is required'
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Phone is required',
    'any.required': 'Phone is required'
  }),
  representative: Joi.string().required().messages({
    'string.empty': 'Representative is required',
    'any.required': 'Representative is required'
  }),
  operationArea: Joi.string().required().messages({
    'string.empty': 'Operation area is required',
    'any.required': 'Operation area is required'
  }),
  pricePerKm: Joi.number().positive().required().messages({
    'number.base': 'Price per km must be a number',
    'number.positive': 'Price per km must be positive',
    'any.required': 'Price per km is required'
  }),
  rating: Joi.number().min(0).max(5).required().messages({
    'number.base': 'Rating must be a number',
    'number.min': 'Rating must be at least 0',
    'number.max': 'Rating cannot exceed 5',
    'any.required': 'Rating is required'
  })
});

export const UpdateTransportersDto = Joi.object({
  vehicleType: Joi.string().optional(),
  status: Joi.string().optional(),
  extEnterprise: Joi.string().optional(),
  phone: Joi.string().optional(),
  representative: Joi.string().optional(),
  operationArea: Joi.string().optional(),
  pricePerKm: Joi.number().positive().optional().messages({
    'number.base': 'Price per km must be a number',
    'number.positive': 'Price per km must be positive'
  }),
  rating: Joi.number().min(0).max(5).optional().messages({
    'number.base': 'Rating must be a number',
    'number.min': 'Rating must be at least 0',
    'number.max': 'Rating cannot exceed 5'
  })
});

export const DeleteTransportersDto = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
});