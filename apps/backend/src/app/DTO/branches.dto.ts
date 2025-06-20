import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface BranchesDTO {
  id: number;
  address: string;
  phone: string;
  email: string;
  purpose: string;
  enterpriseId: number;
}

@JoiDtoSchema(Joi.object({
  address: Joi.string().optional().messages({ 'string.empty': 'Address is required', 'any.required': 'Address is required' }),
  phone: Joi.string().optional(),
  email: Joi.string().optional().email().messages({ 'string.email': 'Email must be a valid email address' }),
  purpose: Joi.string().optional(),
  enterpriseId: Joi.number().optional().integer().positive().messages({ 'number.base': 'Enterprise ID must be a number', 'number.integer': 'Enterprise ID must be an integer', 'number.positive': 'Enterprise ID must be positive' })
}))

export class CreateBranchesDto {
  address: string;
  phone?: string;
  email?: string;
  purpose?: string;
  enterpriseId?: number;
  
  constructor(address: string) {
    this.address = address;
  }
}

@JoiDtoSchema(Joi.object({
  address: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional().messages({ 'string.email': 'Email must be a valid email address' }),
  purpose: Joi.string().optional(),
  enterpriseId: Joi.number().integer().positive().optional().messages({ 'number.base': 'Enterprise ID must be a number', 'number.integer': 'Enterprise ID must be an integer', 'number.positive': 'Enterprise ID must be positive' })
}))

export class UpdateBranchesDto {
  address?: string;
  phone?: string;
  email?: string;
  purpose?: string;
  enterpriseId?: number;
}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({ 'number.base': 'ID must be a number', 'number.integer': 'ID must be an integer', 'number.positive': 'ID must be positive', 'any.required': 'ID is required' })
}))

export class DeleteBranchesDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}
