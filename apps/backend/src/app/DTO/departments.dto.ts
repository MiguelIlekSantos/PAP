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
  branchIds: Joi.array().items(Joi.number().integer().positive()).optional(),
  employeeIds: Joi.array().items(Joi.number().integer().positive()).optional()
}))
export class CreateDepartmentsDto {
  name: string;
  description?: string;
  responsible?: string;
  totalEmployees?: number;
  branchIds?: number[];
  employeeIds?: number[];

  constructor(name: string){
    this.name = name
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
  branchIds: Joi.array().items(Joi.number().integer().positive()).optional(),
  employeeIds: Joi.array().items(Joi.number().integer().positive()).optional()
}))
export class UpdateDepartmentsDto {
  name?: string;
  description?: string;
  responsible?: string;
  totalEmployees?: number;
  branchIds?: number[];
  employeeIds?: number[];
}
