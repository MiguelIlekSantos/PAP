import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

@JoiDtoSchema(Joi.object({
  address: Joi.string().required().messages({ 'string.empty': 'Address is required', 'any.required': 'Address is required' }),
  phone: Joi.string().optional(),
  email: Joi.string().optional().email().messages({ 'string.email': 'Email must be a valid email address' }),
  purpose: Joi.string().optional(),
  enterpriseId: Joi.number().required().integer().positive().messages({ 'number.base': 'Enterprise ID must be a number', 'number.integer': 'Enterprise ID must be an integer', 'number.positive': 'Enterprise ID must be positive' }),
  departments: Joi.array().items(Joi.number()).optional(),
  products: Joi.array().items(Joi.number()).optional(),
}))

export class CreateBranchesDto {
  address: string;
  phone?: string;
  email?: string;
  purpose?: string;
  enterpriseId?: number;
  departments?: number[];
  products?: number[];

  constructor(address: string) {
    this.address = address;
  }
}

@JoiDtoSchema(Joi.object({
  address: Joi.string().optional(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional().messages({ 'string.email': 'Email must be a valid email address' }),
  purpose: Joi.string().optional(),
  enterpriseId: Joi.number().integer().positive().optional().messages({ 'number.base': 'Enterprise ID must be a number', 'number.integer': 'Enterprise ID must be an integer', 'number.positive': 'Enterprise ID must be positive' }),
  departments: Joi.array().items(Joi.number()).optional(),
  products: Joi.array().items(Joi.number()).optional(),
}))

export class UpdateBranchesDto {
  address?: string;
  phone?: string;
  email?: string;
  purpose?: string;
  enterpriseId?: number;
  departments?: number[];
  products?: number[];
}

