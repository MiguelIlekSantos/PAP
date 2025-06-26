import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';


@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'Name is required', 'any.required': 'Name is required' }),
  email: Joi.string().email().optional().messages({ 'string.email': 'Email must be a valid email address' }),
  phone: Joi.string().optional(),
  position: Joi.string().optional(),
  salary: Joi.number().positive().optional().messages({ 'number.base': 'Salary must be a number', 'number.positive': 'Salary must be positive' }),
  dateOfHire: Joi.date().optional().messages({ 'date.base': 'Date of hire must be a valid date' }),
  shiftType: Joi.string().optional(),
  workingHours: Joi.number().integer().min(0).max(24).optional().messages({
    'number.base': 'Working hours must be a number',
    'number.integer': 'Working hours must be an integer',
    'number.min': 'Working hours must be at least 0',
    'number.max': 'Working hours cannot exceed 24'
  }),
  workingDays: Joi.number().integer().min(0).max(7).optional().messages({
    'number.base': 'Working days must be a number',
    'number.integer': 'Working days must be an integer',
    'number.min': 'Working days must be at least 0',
    'number.max': 'Working days cannot exceed 7'
  }),
  status: Joi.string().optional(),
  departmentId: Joi.number().integer().positive().required().messages({
    'number.base': 'Department ID must be a number',
    'number.integer': 'Department ID must be an integer',
    'number.positive': 'Department ID must be positive',
    'any.required': 'Department ID is required'
  }),
  projects: Joi.array().items(Joi.number().integer().positive()).optional(),
  tasks: Joi.array().items(Joi.number().integer().positive()).optional(),
}))
export class CreateEmployeesDto {
  name: string;
  email?: string;
  phone?: string;
  position?: string;
  salary?: number;
  dateOfHire?: Date;
  shiftType?: string;
  workingHours?: number;
  workingDays?: number;
  status?: string;
  departmentId: number;
  projects?: number[];
  tasks?: number[];

  constructor(name: string, departmentId: number) {
    this.name = name;
    this.departmentId = departmentId;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional().messages({ 'string.email': 'Email must be a valid email address' }),
  phone: Joi.string().optional(),
  position: Joi.string().optional(),
  salary: Joi.number().positive().optional().messages({ 'number.base': 'Salary must be a number', 'number.positive': 'Salary must be positive' }),
  dateOfHire: Joi.date().optional().messages({ 'date.base': 'Date of hire must be a valid date' }),
  shiftType: Joi.string().optional(),
  workingHours: Joi.number().integer().min(0).max(24).optional().messages({
    'number.base': 'Working hours must be a number',
    'number.integer': 'Working hours must be an integer',
    'number.min': 'Working hours must be at least 0',
    'number.max': 'Working hours cannot exceed 24'
  }),
  workingDays: Joi.number().integer().min(0).max(7).optional().messages({
    'number.base': 'Working days must be a number',
    'number.integer': 'Working days must be an integer',
    'number.min': 'Working days must be at least 0',
    'number.max': 'Working days cannot exceed 7'
  }),
  status: Joi.string().optional(),
  departmentId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Department ID must be a number',
    'number.integer': 'Department ID must be an integer',
    'number.positive': 'Department ID must be positive'
  }),
  projects: Joi.array().items(Joi.number().integer().positive()).optional(),
  tasks: Joi.array().items(Joi.number().integer().positive()).optional(),
}))
export class UpdateEmployeesDto {
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  salary?: number;
  dateOfHire?: Date;
  shiftType?: string;
  workingHours?: number;
  workingDays?: number;
  status?: string;
  departmentId?: number;
  projects?: number[];
  tasks?: number[];
}
