import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';


@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  description: Joi.string().optional(),
  responsible: Joi.string().optional(),
  totalEmployees: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Total employees must be a number',
    'number.integer': 'Total employees must be an integer',
    'number.min': 'Total employees must be at least 0'
  }),
  departmentId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Department ID must be a number',
    'number.integer': 'Department ID must be an integer',
    'number.positive': 'Department ID must be positive'
  }),
  budget: Joi.number().integer().positive().optional().messages({'number.base': 'Budget must be a number','number.integer': 'Budget must be an integer','number.positive': 'Budget must be positive'}),
}))

export class CreateSubDepartmentsDto {
  name: string;
  description?: string;
  responsible?: string;
  totalEmployees?: number;
  departmentId?: number;
  budget?: number;
  
  constructor(name: string) {
    this.name = name;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  responsible: Joi.string().optional(),
  totalEmployees: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Total employees must be a number',
    'number.integer': 'Total employees must be an integer',
    'number.min': 'Total employees must be at least 0'
  }),
  departmentId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Department ID must be a number',
    'number.integer': 'Department ID must be an integer',
    'number.positive': 'Department ID must be positive'
  }),
  budget: Joi.number().integer().positive().optional().messages({'number.base': 'Budget must be a number','number.integer': 'Budget must be an integer','number.positive': 'Budget must be positive'}),
}))

export class UpdateSubDepartmentsDto {
  name?: string;
  description?: string;
  responsible?: string;
  totalEmployees?: number;
  departmentId?: number;
  budget?: number;
}


