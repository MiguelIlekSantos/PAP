import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';



@JoiDtoSchema(Joi.object({
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  }),
  total: Joi.number().positive().required().messages({
    'number.base': 'Total must be a number',
    'number.positive': 'Total must be positive'
  }),
  paymentMethod: Joi.string().optional(),
  lastPurchase: Joi.date().optional().messages({
    'date.base': 'Last purchase must be a valid date'
  }),
  ClientId: Joi.number().integer().positive().required().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive'
  }),
  Products: Joi.array().items(Joi.number()).optional()
}))

export class CreateSalesDto {
  status: string;
  total: number;
  paymentMethod?: string;
  lastPurchase?: Date;
  ClientId: number;
  Products: number[];
  
  constructor(status: string, total: number, ClientId: number, Products: number[]) {
    this.status = status;
    this.total = total;
    this.ClientId = ClientId;
    this.Products = Products
  }
}

@JoiDtoSchema(Joi.object({
  status: Joi.string().optional(),
  total: Joi.number().positive().optional().messages({
    'number.base': 'Total must be a number',
    'number.positive': 'Total must be positive'
  }),
  paymentMethod: Joi.string().optional(),
  lastPurchase: Joi.date().optional().messages({
    'date.base': 'Last purchase must be a valid date'
  }),
  ClientId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive'
  }),
  Products: Joi.array().items(Joi.number()).optional()
}))

export class UpdateSalesDto {
  status?: string;
  total?: number;
  paymentMethod?: string;
  lastPurchase?: Date;
  ClientId?: number;
  Products?: number[];
}


