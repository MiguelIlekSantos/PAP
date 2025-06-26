import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface SuppliersDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  purchases: number[];
  enterpriseId: number;
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address'
  }),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  purchases: Joi.array().items(Joi.number()).optional(),
  enterpriseId: Joi.number().integer().positive().required().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive'}),
}))

export class CreateSuppliersDto {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  purchases?: number[];
  enterpriseId: number;

  constructor(name: string, enterpriseId: number) {
    this.name = name;
    this.enterpriseId = enterpriseId;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address'
  }),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  purchases: Joi.array().items(Joi.number()).optional(),
}))

export class UpdateSuppliersDto {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  purchases?: number[];
}
