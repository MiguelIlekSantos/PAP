import * as Joi from 'joi';

export const CreateCampaignsDto = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  type: Joi.string().required().messages({
    'string.empty': 'Type is required',
    'any.required': 'Type is required'
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  }),
  leads: Joi.number().integer().min(0).required().messages({
    'number.base': 'Leads must be a number',
    'number.integer': 'Leads must be an integer',
    'number.min': 'Leads must be at least 0',
    'any.required': 'Leads is required'
  }),
  conversions: Joi.number().integer().min(0).required().messages({
    'number.base': 'Conversions must be a number',
    'number.integer': 'Conversions must be an integer',
    'number.min': 'Conversions must be at least 0',
    'any.required': 'Conversions is required'
  }),
  roi: Joi.number().required().messages({
    'number.base': 'ROI must be a number',
    'any.required': 'ROI is required'
  })
});

export const UpdateCampaignsDto = Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  status: Joi.string().optional(),
  leads: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Leads must be a number',
    'number.integer': 'Leads must be an integer',
    'number.min': 'Leads must be at least 0'
  }),
  conversions: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Conversions must be a number',
    'number.integer': 'Conversions must be an integer',
    'number.min': 'Conversions must be at least 0'
  }),
  roi: Joi.number().optional().messages({
    'number.base': 'ROI must be a number'
  })
});

export const DeleteCampaignsDto = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
});