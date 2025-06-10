import { JoiDtoSchema } from '@pap/utils';
import * as Joi from 'joi';

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  type: Joi.string().required().messages({
    'string.empty': 'Type is required',
    'any.required': 'Type is required'
  }),
  frequency: Joi.string().required().messages({
    'string.empty': 'Frequency is required',
    'any.required': 'Frequency is required'
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  }),
  lastUpdate: Joi.date().required().messages({
    'date.base': 'Last update must be a valid date',
    'any.required': 'Last update is required'
  }),
  nextUpdate: Joi.date().required().messages({
    'date.base': 'Next update must be a valid date',
    'any.required': 'Next update is required'
  }),
  downloads: Joi.number().integer().min(0).required().messages({
    'number.base': 'Downloads must be a number',
    'number.integer': 'Downloads must be an integer',
    'number.min': 'Downloads must be at least 0',
    'any.required': 'Downloads is required'
  }),
  path: Joi.string().required().messages({
    'string.empty': 'Path is required',
    'any.required': 'Path is required'
  })
}))

export class CreateReportsDto {}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  frequency: Joi.string().optional(),
  status: Joi.string().optional(),
  lastUpdate: Joi.date().optional().messages({
    'date.base': 'Last update must be a valid date'
  }),
  nextUpdate: Joi.date().optional().messages({
    'date.base': 'Next update must be a valid date'
  }),
  downloads: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Downloads must be a number',
    'number.integer': 'Downloads must be an integer',
    'number.min': 'Downloads must be at least 0'
  }),
  path: Joi.string().optional()
}))

export class UpdateReportsDto {}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
}))

export class DeleteReportsDto {}