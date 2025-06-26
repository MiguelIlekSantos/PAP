import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface PurchasesDTO {
  id: number;
  number: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  brand: string;
  model: string;
  sku: string;
  weight: number;
  dimensions: string;
  imageUrl: string;
  supplierId: number;
}

@JoiDtoSchema(Joi.object({
  number: Joi.string().required().messages({
    'string.empty': 'Number is required',
    'any.required': 'Number is required'
  }),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().positive().optional().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be positive'
  }),
  category: Joi.string().optional(),
  subCategory: Joi.string().optional(),
  brand: Joi.string().optional(),
  model: Joi.string().optional(),
  sku: Joi.string().optional(),
  weight: Joi.number().positive().optional().messages({
    'number.base': 'Weight must be a number',
    'number.positive': 'Weight must be positive'
  }),
  dimensions: Joi.string().optional(),
  imageUrl: Joi.string().uri().optional().messages({
    'string.uri': 'Image URL must be a valid URL'
  }),
  supplierId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Supplier ID must be a number',
    'number.integer': 'Supplier ID must be an integer',
    'number.positive': 'Supplier ID must be positive'
  })
}))

export class CreatePurchasesDto {
  number: string;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  subCategory?: string;
  brand?: string;
  model?: string;
  sku?: string;
  weight?: number;
  dimensions?: string;
  imageUrl?: string;
  supplierId?: number;
  
  constructor(number: string) {
    this.number = number;
  }
}

@JoiDtoSchema(Joi.object({
  number: Joi.string().optional(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().positive().optional().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be positive'
  }),
  category: Joi.string().optional(),
  subCategory: Joi.string().optional(),
  brand: Joi.string().optional(),
  model: Joi.string().optional(),
  sku: Joi.string().optional(),
  weight: Joi.number().positive().optional().messages({
    'number.base': 'Weight must be a number',
    'number.positive': 'Weight must be positive'
  }),
  dimensions: Joi.string().optional(),
  imageUrl: Joi.string().uri().optional().messages({
    'string.uri': 'Image URL must be a valid URL'
  }),
  supplierId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Supplier ID must be a number',
    'number.integer': 'Supplier ID must be an integer',
    'number.positive': 'Supplier ID must be positive'
  })
}))

export class UpdatePurchasesDto {
  number?: string;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  subCategory?: string;
  brand?: string;
  model?: string;
  sku?: string;
  weight?: number;
  dimensions?: string;
  imageUrl?: string;
  supplierId?: number;
}


