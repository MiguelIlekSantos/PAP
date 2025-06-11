import { JoiDtoSchema } from '@pap/utils';
import * as Joi from 'joi';

export interface EquipmentsDTO {
  id: number;
  name: string;
  description: string;
  serialNumber: string;
  model: string;
  brand: string;
  purchaseDate: Date;
  warrantyEndDate: Date;
  status: string;
  location: string;
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'Name is required', 'any.required': 'Name is required' }),
  description: Joi.string().required().messages({ 'string.empty': 'Description is required', 'any.required': 'Description is required' }),
  serialNumber: Joi.string().required().messages({ 'string.empty': 'Serial number is required', 'any.required': 'Serial number is required' }),
  model: Joi.string().required().messages({ 'string.empty': 'Model is required', 'any.required': 'Model is required' }),
  brand: Joi.string().required().messages({ 'string.empty': 'Brand is required', 'any.required': 'Brand is required' }),
  purchaseDate: Joi.date().required().messages({ 'date.base': 'Purchase date must be a valid date', 'any.required': 'Purchase date is required' }),
  warrantyEndDate: Joi.date().required().messages({ 'date.base': 'Warranty end date must be a valid date', 'any.required': 'Warranty end date is required' }),
  status: Joi.string().required().messages({ 'string.empty': 'Status is required', 'any.required': 'Status is required' }),
  location: Joi.string().required().messages({ 'string.empty': 'Location is required', 'any.required': 'Location is required' })
}))

export class CreateEquipmentsDto {
  name: string;
  description?: string;
  serialNumber?: string;
  model?: string;
  brand?: string;
  purchaseDate?: Date;
  warrantyEndDate?: Date;
  status?: string;
  location?: string;
  
  constructor(name: string) {
    this.name = name;
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
  location: Joi.string().optional()
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
}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({ 'number.base': 'ID must be a number', 'number.integer': 'ID must be an integer', 'number.positive': 'ID must be positive', 'any.required': 'ID is required' })
}))

export class DeleteEquipmentsDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}