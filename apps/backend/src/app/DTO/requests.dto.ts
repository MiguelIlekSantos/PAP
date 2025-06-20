import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface RequestsDTO {
  id: number;
  number: string;
  clientId: number;
  deliveryDate: Date;
  status: string;
}

@JoiDtoSchema(Joi.object({
  number: Joi.string().required().messages({
    'string.empty': 'Number is required',
    'any.required': 'Number is required'
  }),
  clientId: Joi.number().integer().positive().required().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive',
    'any.required': 'Client ID is required'
  }),
  deliveryDate: Joi.date().required().messages({
    'date.base': 'Delivery date must be a valid date',
    'any.required': 'Delivery date is required'
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  })
}))

export class CreateRequestsDto {
  number: string;
  clientId?: number;
  deliveryDate?: Date;
  status?: string;
  
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
  status: Joi.string().optional()
}))

export class UpdateRequestsDto {
  number?: string;
  clientId?: number;
  deliveryDate?: Date;
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

export class DeleteRequestsDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}
