import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface InvoicesDTO {
  id: number;
  number: string;
  ClientId: number;
  registerdate: Date;
  dueDate: Date;
  paymentDate: Date;
  total: number;
  status: string;
}

@JoiDtoSchema(Joi.object({
  number: Joi.string().required().messages({
    'string.empty': 'Number is required',
    'any.required': 'Number is required'
  }),
  ClientId: Joi.number().integer().positive().required().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive',
    'any.required': 'Client ID is required'
  }),
  registerdate: Joi.date().required().messages({
    'date.base': 'Register date must be a valid date',
    'any.required': 'Register date is required'
  }),
  dueDate: Joi.date().required().messages({
    'date.base': 'Due date must be a valid date',
    'any.required': 'Due date is required'
  }),
  paymentDate: Joi.date().required().messages({
    'date.base': 'Payment date must be a valid date',
    'any.required': 'Payment date is required'
  }),
  total: Joi.number().positive().required().messages({
    'number.base': 'Total must be a number',
    'number.positive': 'Total must be positive',
    'any.required': 'Total is required'
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  })
}))

export class CreateInvoicesDto {
  number: string;
  ClientId?: number;
  registerdate?: Date;
  dueDate?: Date;
  paymentDate?: Date;
  total?: number;
  status?: string;
  
  constructor(number: string) {
    this.number = number;
  }
}

@JoiDtoSchema(Joi.object({
  number: Joi.string().optional(),
  ClientId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive'
  }),
  registerdate: Joi.date().optional().messages({
    'date.base': 'Register date must be a valid date'
  }),
  dueDate: Joi.date().optional().messages({
    'date.base': 'Due date must be a valid date'
  }),
  paymentDate: Joi.date().optional().messages({
    'date.base': 'Payment date must be a valid date'
  }),
  total: Joi.number().positive().optional().messages({
    'number.base': 'Total must be a number',
    'number.positive': 'Total must be positive'
  }),
  status: Joi.string().optional()
}))

export class UpdateInvoicesDto {
  number?: string;
  ClientId?: number;
  registerdate?: Date;
  dueDate?: Date;
  paymentDate?: Date;
  total?: number;
  status?: string;
}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
}))

export class DeleteInvoicesDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}
