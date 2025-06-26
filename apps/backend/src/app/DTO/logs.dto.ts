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
  level: Joi.string().optional(),
  timestamp: Joi.date().optional().messages({
    'date.base': 'Timestamp must be a valid date'
  }),
  category: Joi.string().optional(),
  InternSystemId: Joi.number().integer().positive().required().messages({
    'number.base': 'Intern System ID must be a number',
    'number.integer': 'Intern System ID must be an integer',
    'number.positive': 'Intern System ID must be positive'
  }),
  userId: Joi.number().integer().positive().required().messages({
    'number.base': 'User ID must be a number',
    'number.integer': 'User ID must be an integer',
    'number.positive': 'User ID must be positive'
  })
}))

export class CreateLogsDto {
  action: string;
  level?: string;
  timestamp?: Date;
  category?: string;
  InternSystemId: number;
  userId: number;
  
  constructor(action: string, userId: number, InternSystemId: number) {
    this.action = action;
    this.userId = userId;
    this.InternSystemId = InternSystemId;
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


