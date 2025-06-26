import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface TasksDTO {
  id: number;
  name: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  completed: boolean;
  completedAt: Date;
  projectId: number;
  status: string;
  priority: string;
  responsible: number;
  employees: number[];
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  description: Joi.string().optional(),
  assignedTo: Joi.string().optional(),
  dueDate: Joi.date().optional().messages({
    'date.base': 'Due date must be a valid date'
  }),
  completed: Joi.boolean().optional().messages({
    'boolean.base': 'Completed must be a boolean'
  }),
  completedAt: Joi.date().optional().messages({
    'date.base': 'Completed at must be a valid date'
  }),
  projectId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Project ID must be a number',
    'number.integer': 'Project ID must be an integer',
    'number.positive': 'Project ID must be positive'
  }),
  status: Joi.string().optional(),
  priority: Joi.string().optional(),
  responsible: Joi.number().integer().positive().optional().messages({
    'number.base': 'Responsible must be a number',
    'number.integer': 'Responsible must be an integer',
    'number.positive': 'Responsible must be positive'
  }),
  employees: Joi.array().items(Joi.number()).optional()
}))

export class CreateTasksDto {
  name: string;
  description?: string;
  assignedTo?: string;
  dueDate?: Date;
  completed?: boolean;
  completedAt?: Date;
  projectId?: number;
  status?: string;
  priority?: string;
  responsible?: number;
  employees?: number[];

  constructor(name: string) {
    this.name = name;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  assignedTo: Joi.string().optional(),
  dueDate: Joi.date().optional().messages({
    'date.base': 'Due date must be a valid date'
  }),
  completed: Joi.boolean().optional().messages({
    'boolean.base': 'Completed must be a boolean'
  }),
  completedAt: Joi.date().optional().messages({
    'date.base': 'Completed at must be a valid date'
  }),
  projectId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Project ID must be a number',
    'number.integer': 'Project ID must be an integer',
    'number.positive': 'Project ID must be positive'
  }),
  status: Joi.string().optional(),
  priority: Joi.string().optional(),
  responsible: Joi.number().integer().positive().optional().messages({
    'number.base': 'Responsible must be a number',
    'number.integer': 'Responsible must be an integer',
    'number.positive': 'Responsible must be positive'
  }),
  employees: Joi.array().items(Joi.number()).optional()
}))

export class UpdateTasksDto {
  name?: string;
  description?: string;
  assignedTo?: string;
  dueDate?: Date;
  completed?: boolean;
  completedAt?: Date;
  projectId?: number;
  status?: string;
  priority?: string;
  responsible?: number;
  employees?: number[];
}
