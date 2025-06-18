import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface InternSystemsDTO {
  id: number;
  name: string;
  type: string;
  version: string;
  environment: string;
  tecnology: string;
  status: string;
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'Name is required', 'any.required': 'Name is required' }),
  type: Joi.string().required().messages({ 'string.empty': 'Type is required', 'any.required': 'Type is required' }),
  version: Joi.string().required().messages({ 'string.empty': 'Version is required', 'any.required': 'Version is required' }),
  environment: Joi.string().required().messages({ 'string.empty': 'Environment is required', 'any.required': 'Environment is required' }),
  tecnology: Joi.string().required().messages({ 'string.empty': 'Technology is required', 'any.required': 'Technology is required' }),
  status: Joi.string().required().messages({ 'string.empty': 'Status is required', 'any.required': 'Status is required' })
}))

export class CreateInternSystemsDto {
  name: string;
  type?: string;
  version?: string;
  environment?: string;
  tecnology?: string;
  status?: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  version: Joi.string().optional(),
  environment: Joi.string().optional(),
  tecnology: Joi.string().optional(),
  status: Joi.string().optional()
}))

export class UpdateInternSystemsDto {
  name?: string;
  type?: string;
  version?: string;
  environment?: string;
  tecnology?: string;
  status?: string;
}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({ 'number.base': 'ID must be a number', 'number.integer': 'ID must be an integer', 'number.positive': 'ID must be positive', 'any.required': 'ID is required' })
}))

export class DeleteInternSystemsDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}
