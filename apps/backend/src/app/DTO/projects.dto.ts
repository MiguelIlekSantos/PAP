import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';


@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  description: Joi.string().optional(),
  startDate: Joi.date().optional().messages({
    'date.base': 'Start date must be a valid date'
  }),
  endDate: Joi.date().optional().messages({
    'date.base': 'End date must be a valid date'
  }),
  status: Joi.string().optional(),
  progress: Joi.number().min(0).max(100).optional().messages({
    'number.base': 'Progress must be a number',
    'number.min': 'Progress must be at least 0',
    'number.max': 'Progress cannot exceed 100'
  }),
  priority: Joi.string().optional(),
  manager: Joi.string().optional(),
  clientId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive'
  }),
  budget: Joi.number().integer().positive().required().messages({'number.base': 'Budget must be a number','number.integer': 'Budget must be an integer','number.positive': 'Budget must be positive'}),
  employees: Joi.array().items(Joi.number().integer().positive()).optional(),
  tasks: Joi.array().items(Joi.number().integer().positive()).optional(),
  chat: Joi.number().integer().positive().required().messages({'number.base': 'Chat must be a number','number.integer': 'Chat must be an integer','number.positive': 'Chat must be positive'}),
    enterpriseId: Joi.number().integer().positive().required().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive'}),
}))

export class CreateProjectsDto {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  progress?: number;
  priority?: string;
  manager?: string;
  clientId?: number;
  enterpriseId:number;
  
  constructor(name: string, enterpriseId:number) {
    this.name = name;
    this.enterpriseId=enterpriseId;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  startDate: Joi.date().optional().messages({
    'date.base': 'Start date must be a valid date'
  }),
  endDate: Joi.date().optional().messages({
    'date.base': 'End date must be a valid date'
  }),
  status: Joi.string().optional(),
  progress: Joi.number().min(0).max(100).optional().messages({
    'number.base': 'Progress must be a number',
    'number.min': 'Progress must be at least 0',
    'number.max': 'Progress cannot exceed 100'
  }),
  priority: Joi.string().optional(),
  manager: Joi.string().optional(),
  clientId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive'
  })
}))

export class UpdateProjectsDto {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  progress?: number;
  priority?: string;
  manager?: string;
  clientId?: number;
}


