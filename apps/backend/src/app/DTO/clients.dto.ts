import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface ClientsDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  address: string;
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Phone is required',
    'any.required': 'Phone is required'
  }),
  type: Joi.string().required().messages({
    'string.empty': 'Type is required',
    'any.required': 'Type is required'
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required'
  })
}))

export class CreateClientsDto {
  name: string;
  email?: string;
  phone?: string;
  type?: string;
  address?: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address'
  }),
  phone: Joi.string().optional(),
  type: Joi.string().optional(),
  address: Joi.string().optional()
}))

export class UpdateClientsDto {
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  address?: string;
}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
}))

export class DeleteClientsDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}
