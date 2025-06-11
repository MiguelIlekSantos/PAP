import { JoiDtoSchema } from '@pap/utils';
import * as Joi from 'joi';

export interface EmployeesDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  salary: number;
  dateOfHire: Date;
  shiftType: string;
  workingHours: number;
  workingDays: number;
  status: string;
  departmentId: number;
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'Name is required', 'any.required': 'Name is required' }),
  email: Joi.string().email().required().messages({ 'string.email': 'Email must be a valid email address', 'string.empty': 'Email is required', 'any.required': 'Email is required' }),
  phone: Joi.string().required().messages({ 'string.empty': 'Phone is required', 'any.required': 'Phone is required' }),
  position: Joi.string().required().messages({ 'string.empty': 'Position is required', 'any.required': 'Position is required' }),
  salary: Joi.number().positive().required().messages({ 'number.base': 'Salary must be a number', 'number.positive': 'Salary must be positive', 'any.required': 'Salary is required' }),
  dateOfHire: Joi.date().required().messages({ 'date.base': 'Date of hire must be a valid date', 'any.required': 'Date of hire is required' }),
  shiftType: Joi.string().required().messages({ 'string.empty': 'Shift type is required', 'any.required': 'Shift type is required' }),
  workingHours: Joi.number().integer().min(0).max(24).required().messages({ 'number.base': 'Working hours must be a number', 'number.integer': 'Working hours must be an integer', 'number.min': 'Working hours must be at least 0', 'number.max': 'Working hours cannot exceed 24', 'any.required': 'Working hours is required' }),
  workingDays: Joi.number().integer().min(0).max(7).required().messages({ 'number.base': 'Working days must be a number', 'number.integer': 'Working days must be an integer', 'number.min': 'Working days must be at least 0', 'number.max': 'Working days cannot exceed 7', 'any.required': 'Working days is required' }),
  status: Joi.string().required().messages({ 'string.empty': 'Status is required', 'any.required': 'Status is required' }),
  departmentId: Joi.number().integer().positive().required().messages({ 'number.base': 'Department ID must be a number', 'number.integer': 'Department ID must be an integer', 'number.positive': 'Department ID must be positive', 'any.required': 'Department ID is required' })
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
  departmentId?: number;
  
  constructor(name: string) {
    this.name = name;
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
  workingHours: Joi.number().integer().min(0).max(24).optional().messages({ 'number.base': 'Working hours must be a number', 'number.integer': 'Working hours must be an integer', 'number.min': 'Working hours must be at least 0', 'number.max': 'Working hours cannot exceed 24' }),
  workingDays: Joi.number().integer().min(0).max(7).optional().messages({ 'number.base': 'Working days must be a number', 'number.integer': 'Working days must be an integer', 'number.min': 'Working days must be at least 0', 'number.max': 'Working days cannot exceed 7' }),
  status: Joi.string().optional(),
  departmentId: Joi.number().integer().positive().optional().messages({ 'number.base': 'Department ID must be a number', 'number.integer': 'Department ID must be an integer', 'number.positive': 'Department ID must be positive' })
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
}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({ 'number.base': 'ID must be a number', 'number.integer': 'ID must be an integer', 'number.positive': 'ID must be positive', 'any.required': 'ID is required' })
}))

export class DeleteEmployeesDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}