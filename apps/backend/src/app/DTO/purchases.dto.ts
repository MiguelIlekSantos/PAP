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
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
    'any.required': 'Description is required'
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be positive',
    'any.required': 'Price is required'
  }),
  category: Joi.string().required().messages({
    'string.empty': 'Category is required',
    'any.required': 'Category is required'
  }),
  subCategory: Joi.string().required().messages({
    'string.empty': 'Sub category is required',
    'any.required': 'Sub category is required'
  }),
  brand: Joi.string().required().messages({
    'string.empty': 'Brand is required',
    'any.required': 'Brand is required'
  }),
  model: Joi.string().required().messages({
    'string.empty': 'Model is required',
    'any.required': 'Model is required'
  }),
  sku: Joi.string().required().messages({
    'string.empty': 'SKU is required',
    'any.required': 'SKU is required'
  }),
  weight: Joi.number().positive().required().messages({
    'number.base': 'Weight must be a number',
    'number.positive': 'Weight must be positive',
    'any.required': 'Weight is required'
  }),
  dimensions: Joi.string().required().messages({
    'string.empty': 'Dimensions is required',
    'any.required': 'Dimensions is required'
  }),
  imageUrl: Joi.string().uri().required().messages({
    'string.uri': 'Image URL must be a valid URL',
    'string.empty': 'Image URL is required',
    'any.required': 'Image URL is required'
  }),
  supplierId: Joi.number().integer().positive().required().messages({
    'number.base': 'Supplier ID must be a number',
    'number.integer': 'Supplier ID must be an integer',
    'number.positive': 'Supplier ID must be positive',
    'any.required': 'Supplier ID is required'
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

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
}))

export class DeletePurchasesDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}
