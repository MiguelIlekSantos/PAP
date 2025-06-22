import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';


export interface TasksDto {
  name: string
  description: string
  assignedTo: string
  dueDate: string
  completed: boolean
  completedAt: string
  projectId: number
  status: string
  priority: string
  responsible: number
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
  assignedTo: Joi.string().required().messages({
    'string.empty': 'Assigned to is required',
    'any.required': 'Assigned to is required'
  }),
  dueDate: Joi.date().required().messages({
    'date.base': 'Due date must be a valid date',
    'any.required': 'Due date is required'
  }),
  completed: Joi.boolean().required().messages({
    'boolean.base': 'Completed must be a boolean',
    'any.required': 'Completed is required'
  }),
  completedAt: Joi.date().required().messages({
    'date.base': 'Completed at must be a valid date',
    'any.required': 'Completed at is required'
  }),
  projectId: Joi.number().integer().positive().required().messages({
    'number.base': 'Project ID must be a number',
    'number.integer': 'Project ID must be an integer',
    'number.positive': 'Project ID must be positive',
    'any.required': 'Project ID is required'
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  }),
  priority: Joi.string().required().messages({
    'string.empty': 'Priority is required',
    'any.required': 'Priority is required'
  }),
  responsible: Joi.number().integer().positive().required().messages({
    'number.base': 'Responsible must be a number',
    'number.integer': 'Responsible must be an integer',
    'number.positive': 'Responsible must be positive',
    'any.required': 'Responsible is required'
  })
}))

export class CreateTasksDto {}

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
  })
}))

export class UpdateTasksDto {}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
}))

export class DeleteTasksDto {}
