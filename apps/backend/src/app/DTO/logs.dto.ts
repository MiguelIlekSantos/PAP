import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface LogsDTO {
  id: number;
  action: string;
  level: string;
  timestamp: Date;
  category: string;
  InternSystemId: number;
  userId: number;
}

@JoiDtoSchema(Joi.object({
  action: Joi.string().required().messages({
    'string.empty': 'Action is required',
    'any.required': 'Action is required'
  }),
  level: Joi.string().required().messages({
    'string.empty': 'Level is required',
    'any.required': 'Level is required'
  }),
  timestamp: Joi.date().required().messages({
    'date.base': 'Timestamp must be a valid date',
    'any.required': 'Timestamp is required'
  }),
  category: Joi.string().required().messages({
    'string.empty': 'Category is required',
    'any.required': 'Category is required'
  }),
  InternSystemId: Joi.number().integer().positive().required().messages({
    'number.base': 'Intern System ID must be a number',
    'number.integer': 'Intern System ID must be an integer',
    'number.positive': 'Intern System ID must be positive',
    'any.required': 'Intern System ID is required'
  }),
  userId: Joi.number().integer().positive().required().messages({
    'number.base': 'User ID must be a number',
    'number.integer': 'User ID must be an integer',
    'number.positive': 'User ID must be positive',
    'any.required': 'User ID is required'
  })
}))

export class CreateLogsDto {
  action: string;
  level?: string;
  timestamp?: Date;
  category?: string;
  InternSystemId?: number;
  userId?: number;
  
  constructor(action: string) {
    this.action = action;
  }
}

@JoiDtoSchema(Joi.object({
  action: Joi.string().optional(),
  level: Joi.string().optional(),
  timestamp: Joi.date().optional().messages({
    'date.base': 'Timestamp must be a valid date'
  }),
  category: Joi.string().optional(),
  InternSystemId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Intern System ID must be a number',
    'number.integer': 'Intern System ID must be an integer',
    'number.positive': 'Intern System ID must be positive'
  }),
  userId: Joi.number().integer().positive().optional().messages({
    'number.base': 'User ID must be a number',
    'number.integer': 'User ID must be an integer',
    'number.positive': 'User ID must be positive'
  })
}))

export class UpdateLogsDto {
  action?: string;
  level?: string;
  timestamp?: Date;
  category?: string;
  InternSystemId?: number;
  userId?: number;
}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
}))

export class DeleteLogsDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}
