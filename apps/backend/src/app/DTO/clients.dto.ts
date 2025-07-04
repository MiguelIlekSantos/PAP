import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'Name is required', 'any.required': 'Name is required' }),
  email: Joi.string().email().required().messages({ 'string.email': 'Email must be a valid email address', 'string.empty': 'Email is required', 'any.required': 'Email is required' }),
  phone: Joi.string().required().messages({ 'string.empty': 'Phone is required', 'any.required': 'Phone is required' }),
  type: Joi.string().required().messages({ 'string.empty': 'Type is required', 'any.required': 'Type is required' }),
  address: Joi.string().required().messages({ 'string.empty': 'Address is required', 'any.required': 'Address is required' }),
  sales: Joi.array().items(Joi.number().integer().positive()).optional(),
  requests: Joi.array().items(Joi.number().integer().positive()).optional(),
  invoices: Joi.array().items(Joi.number().integer().positive()).optional(),
  delivery: Joi.array().items(Joi.number().integer().positive()).optional(),
  projects: Joi.array().items(Joi.number().integer().positive()).optional(),
  enterpriseId: Joi.number().integer().positive().required()
}))

export class CreateClientsDto {
  name: string;
  email?: string;
  phone?: string;
  type?: string;
  address?: string;
  sales?: number[];
  requests?: number[];
  invoices?: number[];
  delivery?: number[];
  projects?: number[];
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
  type: Joi.string().optional(),
  address: Joi.string().optional(),
  sales: Joi.array().items(Joi.number().integer().positive()).optional(),
  requests: Joi.array().items(Joi.number().integer().positive()).optional(),
  invoices: Joi.array().items(Joi.number().integer().positive()).optional(),
  delivery: Joi.array().items(Joi.number().integer().positive()).optional(),
  projects: Joi.array().items(Joi.number().integer().positive()).optional(),
}))

export class UpdateClientsDto {
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  address?: string;
  sales?: number[];
  requests?: number[];
  invoices?: number[];
  delivery?: number[];
  projects?: number[];
}

