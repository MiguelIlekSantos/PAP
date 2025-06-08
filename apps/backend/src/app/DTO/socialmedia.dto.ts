import * as Joi from 'joi';

export const CreateSocialMediaDto = Joi.object({
  platform: Joi.string().required().messages({
    'string.empty': 'Platform is required',
    'any.required': 'Platform is required'
  }),
  username: Joi.string().required().messages({
    'string.empty': 'Username is required',
    'any.required': 'Username is required'
  }),
  followers: Joi.number().integer().min(0).required().messages({
    'number.base': 'Followers must be a number',
    'number.integer': 'Followers must be an integer',
    'number.min': 'Followers must be at least 0',
    'any.required': 'Followers is required'
  }),
  engagementRate: Joi.number().min(0).max(100).required().messages({
    'number.base': 'Engagement rate must be a number',
    'number.min': 'Engagement rate must be at least 0',
    'number.max': 'Engagement rate cannot exceed 100',
    'any.required': 'Engagement rate is required'
  })
});

export const UpdateSocialMediaDto = Joi.object({
  platform: Joi.string().optional(),
  username: Joi.string().optional(),
  followers: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Followers must be a number',
    'number.integer': 'Followers must be an integer',
    'number.min': 'Followers must be at least 0'
  }),
  engagementRate: Joi.number().min(0).max(100).optional().messages({
    'number.base': 'Engagement rate must be a number',
    'number.min': 'Engagement rate must be at least 0',
    'number.max': 'Engagement rate cannot exceed 100'
  })
});

export const DeleteSocialMediaDto = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
});