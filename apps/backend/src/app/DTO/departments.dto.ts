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
  branches: Joi.array().items(Joi.number().integer().positive()).optional(),
  subDepartments: Joi.array().items(Joi.number().integer().positive()).optional(),
  employeeIds: Joi.array().items(Joi.number().integer().positive()).optional(),
  enterpriseId: Joi.number().integer().positive().required().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive'}),
}))
export class CreateDepartmentsDto {
  name: string;
  description?: string;
  responsible?: string;
  totalEmployees?: number;
  branches?: number[];
  employeeIds?: number[];
  enterpriseId: number;
  subDepartments?: number[]

  constructor(name: string, enterpriseId: number){
    this.name = name
    this.enterpriseId = enterpriseId;
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
  branches: Joi.array().items(Joi.number().integer().positive()).optional(),
  subDepartments: Joi.array().items(Joi.number().integer().positive()).optional(),
  employeeIds: Joi.array().items(Joi.number().integer().positive()).optional()

}))
export class UpdateDepartmentsDto {
  name?: string;
  description?: string;
  responsible?: string;
  totalEmployees?: number;
  branches?: number[];
  employeeIds?: number[];
  subDepartments?: number[]
}
