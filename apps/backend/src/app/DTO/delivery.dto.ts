import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface DeliveryDto {
  expectedDate?: string; // DateTime?
  deliveryDate?: string; // DateTime?
  status: string;
  clientId: number;
  transporterId: number;
  products?: number[]; // IDs dos produtos
}

@JoiDtoSchema(Joi.object({
  expectedDate: Joi.date().optional().messages({
    'date.base': 'Expected date must be a valid date'
  }),
  deliveryDate: Joi.date().optional().messages({
    'date.base': 'Delivery date must be a valid date'
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  }),
  clientId: Joi.number().integer().positive().required().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive',
    'any.required': 'Client ID is required'
  }),
  transporterId: Joi.number().integer().positive().required().messages({
    'number.base': 'Transporter ID must be a number',
    'number.integer': 'Transporter ID must be an integer',
    'number.positive': 'Transporter ID must be positive',
    'any.required': 'Transporter ID is required'
  }),
  products: Joi.array().items(Joi.number().integer().positive()).optional()
}))
export class CreateDeliveryDto {}

@JoiDtoSchema(Joi.object({
  expectedDate: Joi.date().optional().messages({
    'date.base': 'Expected date must be a valid date'
  }),
  deliveryDate: Joi.date().optional().messages({
    'date.base': 'Delivery date must be a valid date'
  }),
  status: Joi.string().optional(),
  clientId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive'
  }),
  transporterId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Transporter ID must be a number',
    'number.integer': 'Transporter ID must be an integer',
    'number.positive': 'Transporter ID must be positive'
  }),
  products: Joi.array().items(Joi.number().integer().positive()).optional()
}))
export class UpdateDeliveryDto {}
