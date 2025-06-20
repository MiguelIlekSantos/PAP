import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface DepartmentsDTO {
  id: number;
  name: string;
  description: string;
  responsible: string;
  totalEmployees: number;
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'Name is required', 'any.required': 'Name is required' }),
  description: Joi.string().required().messages({ 'string.empty': 'Description is required', 'any.required': 'Description is required' }),
  responsible: Joi.string().required().messages({ 'string.empty': 'Responsible is required', 'any.required': 'Responsible is required' }),
  totalEmployees: Joi.number().integer().min(0).required().messages({ 'number.base': 'Total employees must be a number', 'number.integer': 'Total employees must be an integer', 'number.min': 'Total employees must be at least 0', 'any.required': 'Total employees is required' })
}))

export class CreateDepartmentsDto {
  name: string;
  description?: string;
  responsible?: string;
  totalEmployees?: number;
  
  constructor(name: string) {
    this.name = name;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  responsible: Joi.string().optional(),
  totalEmployees: Joi.number().integer().min(0).optional().messages({ 'number.base': 'Total employees must be a number', 'number.integer': 'Total employees must be an integer', 'number.min': 'Total employees must be at least 0' })
}))

export class UpdateDepartmentsDto {
  name?: string;
  description?: string;
  responsible?: string;
  totalEmployees?: number;
}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({ 'number.base': 'ID must be a number', 'number.integer': 'ID must be an integer', 'number.positive': 'ID must be positive', 'any.required': 'ID is required' })
}))

export class DeleteDepartmentsDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}
