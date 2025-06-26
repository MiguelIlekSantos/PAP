import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'Name is required', 'any.required': 'Name is required' }),
  serialNumber: Joi.string().required(),
  description: Joi.string().optional(),
  model: Joi.string().optional(),
  brand: Joi.string().optional(),
  purchaseDate: Joi.date().optional().messages({ 'date.base': 'Purchase date must be a valid date' }),
  warrantyEndDate: Joi.date().optional().messages({ 'date.base': 'Warranty end date must be a valid date' }),
  status: Joi.string().optional(),
  location: Joi.string().optional(),
  enterpriseId: Joi.number().integer().positive().required().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive'}),
}))

export class CreateEquipmentsDto {
  name: string;
  description?: string;
  serialNumber: string;
  model?: string;
  brand?: string;
  purchaseDate?: Date;
  warrantyEndDate?: Date;
  status?: string;
  location?: string;
  enterpriseId: number;
  
  constructor(name: string, serialNumber: string, enterpriseId: number) {
    this.name = name;
    this.serialNumber = serialNumber;
    this.enterpriseId = enterpriseId;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  serialNumber: Joi.string().optional(),
  model: Joi.string().optional(),
  brand: Joi.string().optional(),
  purchaseDate: Joi.date().optional().messages({ 'date.base': 'Purchase date must be a valid date' }),
  warrantyEndDate: Joi.date().optional().messages({ 'date.base': 'Warranty end date must be a valid date' }),
  status: Joi.string().optional(),
  location: Joi.string().optional(),
  enterpriseId: Joi.number().integer().positive().optional().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive'}),
}))

export class UpdateEquipmentsDto {
  name?: string;
  description?: string;
  serialNumber?: string;
  model?: string;
  brand?: string;
  purchaseDate?: Date;
  warrantyEndDate?: Date;
  status?: string;
  location?: string;
  enterpriseId?: string;
}


