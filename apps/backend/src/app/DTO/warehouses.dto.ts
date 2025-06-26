import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';


@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  location: Joi.string().optional(),
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
    'number.base': 'Section must be a number',
    'number.integer': 'Section must be an integer',
    'number.positive': 'Section must be positive'
  }),
  responsible: Joi.string().optional(),
  status: Joi.string().optional(),
   products: Joi.array().items(Joi.number()).optional(),
   
  enterpriseId: Joi.number().integer().positive().required().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive'}),
}))

export class CreateWareHousesDto {
  name: string;
  location?: string;
  capacity?: number;
  currentStock?: number;
  section?: number;
  responsible?: string;
  status?: string;
  products?: number[];
  enterpriseId: number;

  constructor(name: string, enterpriseId: number) {
    this.name = name;
    this.enterpriseId = enterpriseId;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  location: Joi.string().optional(),
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
    'number.base': 'Section must be a number',
    'number.integer': 'Section must be an integer',
    'number.positive': 'Section must be positive'
  }),
  responsible: Joi.string().optional(),
  status: Joi.string().optional(),
   products: Joi.array().items(Joi.number()).optional(),
   
}))

export class UpdateWareHousesDto {
  name?: string;
  location?: string;
  capacity?: number;
  currentStock?: number;
  section?: number;
  responsible?: string;
  status?: string;
  products?: number[];
}


