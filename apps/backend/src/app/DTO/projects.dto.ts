import { JoiDtoSchema } from '@pap/utils';
import * as Joi from 'joi';

export interface ProjectsDTO {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  progress: number;
  priority: string;
  manager: string;
  clientId: number;
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
    'any.required': 'Description is required'
  }),
  startDate: Joi.date().required().messages({
    'date.base': 'Start date must be a valid date',
    'any.required': 'Start date is required'
  }),
  endDate: Joi.date().required().messages({
    'date.base': 'End date must be a valid date',
    'any.required': 'End date is required'
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  }),
  progress: Joi.number().min(0).max(100).required().messages({
    'number.base': 'Progress must be a number',
    'number.min': 'Progress must be at least 0',
    'number.max': 'Progress cannot exceed 100',
    'any.required': 'Progress is required'
  }),
  priority: Joi.string().required().messages({
    'string.empty': 'Priority is required',
    'any.required': 'Priority is required'
  }),
  manager: Joi.string().required().messages({
    'string.empty': 'Manager is required',
    'any.required': 'Manager is required'
  }),
  clientId: Joi.number().integer().positive().required().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive',
    'any.required': 'Client ID is required'
  })
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
  
  constructor(name: string) {
    this.name = name;
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

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
}))

export class DeleteProjectsDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}