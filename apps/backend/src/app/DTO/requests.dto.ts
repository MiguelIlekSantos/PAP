import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface RequestsDTO {
  id: number;
  number: string;
  clientId: number;
  deliveryDate: Date;
  status: string;
  products: number[];
}

@JoiDtoSchema(Joi.object({
  number: Joi.string().required().messages({
    'string.empty': 'Number is required',
    'any.required': 'Number is required'
  }),
  clientId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive'
  }),
  deliveryDate: Joi.date().optional().messages({
    'date.base': 'Delivery date must be a valid date'
  }),
  status: Joi.string().optional(),
  products: Joi.array().items(Joi.number()).optional()
}))

export class CreateRequestsDto {
  number: string;
  clientId?: number;
  deliveryDate?: Date;
  status?: string;
  products?: number[];
  
  constructor(number: string) {
    this.number = number;
  }
}

@JoiDtoSchema(Joi.object({
  number: Joi.string().optional(),
  clientId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive'
  }),
  deliveryDate: Joi.date().optional().messages({
    'date.base': 'Delivery date must be a valid date'
  }),
  status: Joi.string().optional(),
  products: Joi.array().items(Joi.number()).optional()
}))

export class UpdateRequestsDto {
  number?: string;
  clientId?: number;
  deliveryDate?: Date;
  status?: string;
  products?: number[];
}


