import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface DocumentsDTO {
  id: number;
  name: string;
  description: string;
  type: string;
  size: number;
  path: string;
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'Name is required', 'any.required': 'Name is required' }),
  description: Joi.string().required().messages({ 'string.empty': 'Description is required', 'any.required': 'Description is required' }),
  type: Joi.string().required().messages({ 'string.empty': 'Type is required', 'any.required': 'Type is required' }),
  size: Joi.number().positive().required().messages({ 'number.base': 'Size must be a number', 'number.positive': 'Size must be positive', 'any.required': 'Size is required' }),
  path: Joi.string().required().messages({ 'string.empty': 'Path is required', 'any.required': 'Path is required' })
}))

export class CreateDocumentsDto {
  name: string;
  description?: string;
  type?: string;
  size?: number;
  path?: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  type: Joi.string().optional(),
  size: Joi.number().positive().optional().messages({ 'number.base': 'Size must be a number', 'number.positive': 'Size must be positive' }),
  path: Joi.string().optional()
}))

export class UpdateDocumentsDto {
  name?: string;
  description?: string;
  type?: string;
  size?: number;
  path?: string;
}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({ 'number.base': 'ID must be a number', 'number.integer': 'ID must be an integer', 'number.positive': 'ID must be positive', 'any.required': 'ID is required' })
}))

export class DeleteDocumentsDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}
