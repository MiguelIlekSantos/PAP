import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface SalesDTO {
  id: number;
  total: number;
  Status: string;
  PaymentMethod: string;
  lastPurchase: Date;
  ClientId: number;
  products: number[];
}

@JoiDtoSchema(Joi.object({
  Status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  }),
  total: Joi.number().positive().required().messages({
    'number.base': 'Total must be a number',
    'number.positive': 'Total must be positive'
  }),
  PaymentMethod: Joi.string().optional(),
  lastPurchase: Joi.date().optional().messages({
    'date.base': 'Last purchase must be a valid date'
  }),
  ClientId: Joi.number().integer().positive().required().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive'
  }),
  products: Joi.array().items(Joi.number()).optional()
}))

export class CreateSalesDto {
  Status: string;
  total: number;
  PaymentMethod?: string;
  lastPurchase?: Date;
  ClientId: number;
  products: number[];
  
  constructor(Status: string, total: number, ClientId: number, products: number[]) {
    this.Status = Status;
    this.total = total;
    this.ClientId = ClientId;
    this.products = products
  }
}

@JoiDtoSchema(Joi.object({
  Status: Joi.string().optional(),
  Total: Joi.number().positive().optional().messages({
    'number.base': 'Total must be a number',
    'number.positive': 'Total must be positive'
  }),
  PaymentMethod: Joi.string().optional(),
  lastPurchase: Joi.date().optional().messages({
    'date.base': 'Last purchase must be a valid date'
  }),
  ClientId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive'
  }),
  products: Joi.array().items(Joi.number()).optional()
}))

export class UpdateSalesDto {
  Status?: string;
  Total?: number;
  PaymentMethod?: string;
  lastPurchase?: Date;
  ClientId?: number;
  products?: number[];
}


