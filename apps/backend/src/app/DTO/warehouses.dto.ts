import * as Joi from 'joi';

export const CreateWareHousesDto = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Location is required',
    'any.required': 'Location is required'
  }),
  capacity: Joi.number().integer().positive().required().messages({
    'number.base': 'Capacity must be a number',
    'number.integer': 'Capacity must be an integer',
    'number.positive': 'Capacity must be positive',
    'any.required': 'Capacity is required'
  }),
  currentStock: Joi.number().integer().min(0).required().messages({
    'number.base': 'Current stock must be a number',
    'number.integer': 'Current stock must be an integer',
    'number.min': 'Current stock must be at least 0',
    'any.required': 'Current stock is required'
  }),
  section: Joi.number().integer().positive().required().messages({
    'number.base': 'Section must be a number',
    'number.integer': 'Section must be an integer',
    'number.positive': 'Section must be positive',
    'any.required': 'Section is required'
  }),
  responsible: Joi.string().required().messages({
    'string.empty': 'Responsible is required',
    'any.required': 'Responsible is required'
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  })
});

export const UpdateWareHousesDto = Joi.object({
  name: Joi.string().optional(),
  location: Joi.string().optional(),
  capacity: Joi.number().integer().positive().optional().messages({
    'number.base': 'Capacity must be a number',
    'number.integer': 'Capacity must be an integer',
    'number.positive': 'Capacity must be positive'
  }),
  currentStock: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Current stock must be a number',
    'number.integer': 'Current stock must be an integer',
    'number.min': 'Current stock must be at least 0'
  }),
  section: Joi.number().integer().positive().optional().messages({
    'number.base': 'Section must be a number',
    'number.integer': 'Section must be an integer',
    'number.positive': 'Section must be positive'
  }),
  responsible: Joi.string().optional(),
  status: Joi.string().optional()
});

export const DeleteWareHousesDto = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
});