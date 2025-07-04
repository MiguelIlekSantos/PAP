import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';


@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Warehouse name is required',
    'any.required': 'Warehouse name is required',
    'string.base': 'Warehouse name must be a string'
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Location is required',
    'any.required': 'Location is required',
    'string.base': 'Location must be a string'
  }),
  capacity: Joi.number().integer().positive().optional().messages({
    'number.base': 'Capacity must be a number',
    'number.integer': 'Capacity must be an integer',
    'number.positive': 'Capacity must be positive'
  }),
  currentStock: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Current stock must be a number',
    'number.integer': 'Current stock must be an integer',
    'number.min': 'Current stock must be at least 0'
  }),
  section: Joi.number().integer().positive().optional().messages({
    'number.base': 'Number of sections must be a number',
    'number.integer': 'Number of sections must be an integer',
    'number.positive': 'Number of sections must be positive'
  }),
  responsible: Joi.string().optional().messages({
    'string.base': 'Responsible person must be a string'
  }),
  status: Joi.string().valid('active', 'full', 'maintenance', 'inactive').optional().messages({
    'string.base': 'Status must be a string',
    'any.only': 'Status must be one of: active, full, maintenance, inactive'
  }),
  products: Joi.array().items(Joi.number()).optional().messages({
    'array.base': 'Products must be an array',
    'number.base': 'Product IDs must be numbers'
  }),
  enterpriseId: Joi.number().integer().positive().required().messages({
    'number.base': 'Enterprise ID must be a number',
    'number.integer': 'Enterprise ID must be an integer',
    'number.positive': 'Enterprise ID must be positive',
    'any.required': 'Enterprise ID is required'
  }),
}))

export class CreateWarehousesDto {
  name: string;
  location: string;
  capacity?: number;
  currentStock?: number;
  section?: number;
  responsible?: string;
  status?: string;
  products?: number[];
  enterpriseId: number;

  constructor(name: string, location: string, enterpriseId: number) {
    this.name = name;
    this.location = location;
    this.enterpriseId = enterpriseId;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional().messages({
    'string.base': 'Warehouse name must be a string',
    'string.empty': 'Warehouse name cannot be empty'
  }),
  location: Joi.string().optional().messages({
    'string.base': 'Location must be a string',
    'string.empty': 'Location cannot be empty'
  }),
  capacity: Joi.number().integer().positive().optional().messages({
    'number.base': 'Capacity must be a number',
    'number.integer': 'Capacity must be an integer',
    'number.positive': 'Capacity must be positive'
  }),
  currentStock: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Current stock must be a number',
    'number.integer': 'Current stock must be an integer',
    'number.min': 'Current stock must be at least 0'
  }),
  section: Joi.number().integer().positive().optional().messages({
    'number.base': 'Number of sections must be a number',
    'number.integer': 'Number of sections must be an integer',
    'number.positive': 'Number of sections must be positive'
  }),
  responsible: Joi.string().optional().messages({
    'string.base': 'Responsible person must be a string'
  }),
  status: Joi.string().valid('active', 'full', 'maintenance', 'inactive').optional().messages({
    'string.base': 'Status must be a string',
    'any.only': 'Status must be one of: active, full, maintenance, inactive'
  }),
  products: Joi.array().items(Joi.number()).optional().messages({
    'array.base': 'Products must be an array',
    'number.base': 'Product IDs must be numbers'
  }),
}))

export class UpdateWarehousesDto {
  name?: string;
  location?: string;
  capacity?: number;
  currentStock?: number;
  section?: number;
  responsible?: string;
  status?: string;
  products?: number[];
}


