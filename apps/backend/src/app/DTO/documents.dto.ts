import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface DocumentsDTO {
  id: number;
  name: string;
  description?: string;
  type?: string;
  size?: number;
  path: string;
  enterpriseId: number;
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  description: Joi.string().optional(),
  type: Joi.string().optional(),
  size: Joi.number().positive().optional().messages({
    'number.base': 'Size must be a number',
    'number.positive': 'Size must be positive'
  }),
  path: Joi.string().required().messages({
    'string.empty': 'Path is required',
    'any.required': 'Path is required'
  }),
  enterpriseId: Joi.number().integer().positive().required().messages({
    'number.base': 'Enterprise ID must be a number',
    'number.integer': 'Enterprise ID must be an integer',
    'number.positive': 'Enterprise ID must be positive',
    'any.required': 'Enterprise ID is required'
  })
}))
export class CreateDocumentsDto {
  name: string;
  path: string;
  enterpriseId: number;
  description?: string;
  type?: string;
  size?: number;

  constructor(name: string, path: string, enterpriseId: number) {
    this.name = name;
    this.path = path;
    this.enterpriseId = enterpriseId;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  type: Joi.string().optional(),
  size: Joi.number().positive().optional().messages({
    'number.base': 'Size must be a number',
    'number.positive': 'Size must be positive'
  }),
  path: Joi.string().optional(),
  enterpriseId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Enterprise ID must be a number',
    'number.integer': 'Enterprise ID must be an integer',
    'number.positive': 'Enterprise ID must be positive'
  })
}))
export class UpdateDocumentsDto {
  name?: string;
  description?: string;
  type?: string;
  size?: number;
  path?: string;
  enterpriseId?: number;
}
