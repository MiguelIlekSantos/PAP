import * as Joi from 'joi';

export const CreateChatsDto = Joi.object({
  projectId: Joi.number().integer().positive().required().messages({
    'number.base': 'Project ID must be a number',
    'number.integer': 'Project ID must be an integer',
    'number.positive': 'Project ID must be positive',
    'any.required': 'Project ID is required'
  })
});

export const UpdateChatsDto = Joi.object({
  projectId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Project ID must be a number',
    'number.integer': 'Project ID must be an integer',
    'number.positive': 'Project ID must be positive'
  })
});

export const DeleteChatsDto = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
});