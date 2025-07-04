import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';



@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({'string.empty': 'Name is required','any.required': 'Name is required'}),
  description: Joi.string().optional(),
  price: Joi.number().positive().optional().messages({'number.base': 'Price must be a number','number.positive': 'Price must be positive'}),
  stock: Joi.number().integer().min(0).optional().messages({'number.base': 'Stock must be a number','number.integer': 'Stock must be an integer','number.min': 'Stock must be at least 0'}),
  category: Joi.string().optional(),
  subCategory: Joi.string().optional(),
  brand: Joi.string().optional(),
  model: Joi.string().optional(),
  sku: Joi.string().optional(),
  barcode: Joi.string().optional(),
  weight: Joi.number().positive().optional().messages({'number.base': 'Weight must be a number','number.positive': 'Weight must be positive'}),
  dimensions: Joi.string().optional(),
  imageUrl: Joi.string().uri().optional().messages({'string.uri': 'Image URL must be a valid URL'}),
  wareHouseId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Warehouse ID must be a number',
    'number.integer': 'Warehouse ID must be an integer',
    'number.positive': 'Warehouse ID must be positive'
  }),
  branchId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Branch ID must be a number',
    'number.integer': 'Branch ID must be an integer',
    'number.positive': 'Branch ID must be positive'
  }),
  sales: Joi.array().items(Joi.number().integer().positive()).optional(),
  requests: Joi.array().items(Joi.number().integer().positive()).optional(),
  delivery: Joi.array().items(Joi.number().integer().positive()).optional()
}).custom((value, helpers) => {
  // At least one location (warehouse or branch) must be provided
  if (!value.wareHouseId && !value.branchId) {
    return helpers.error('custom.locationRequired');
  }
  return value;
}).messages({
  'custom.locationRequired': 'Product must be assigned to either a warehouse or a branch'
}))

export class CreateProductsDto {
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  subCategory?: string;
  brand?: string;
  model?: string;
  sku?: string;
  barcode?: string;
  weight?: number;
  dimensions?: string;
  imageUrl?: string;
  wareHouseId?: number;
  branchId?: number;
  sales?: number[];
  requests?: number[];
  delivery?: number[];
  
  constructor(name: string) {
    this.name = name;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().positive().optional().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be positive'
  }),
  stock: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Stock must be a number',
    'number.integer': 'Stock must be an integer',
    'number.min': 'Stock must be at least 0'
  }),
  category: Joi.string().optional(),
  subCategory: Joi.string().optional(),
  brand: Joi.string().optional(),
  model: Joi.string().optional(),
  sku: Joi.string().optional(),
  barcode: Joi.string().optional(),
  weight: Joi.number().positive().optional().messages({
    'number.base': 'Weight must be a number',
    'number.positive': 'Weight must be positive'
  }),
  dimensions: Joi.string().optional(),
  imageUrl: Joi.string().uri().optional().messages({
    'string.uri': 'Image URL must be a valid URL'
  }),
  wareHouseId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Warehouse ID must be a number',
    'number.integer': 'Warehouse ID must be an integer',
    'number.positive': 'Warehouse ID must be positive'
  }),
  branchId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Branch ID must be a number',
    'number.integer': 'Branch ID must be an integer',
    'number.positive': 'Branch ID must be positive'
  }),
  sales: Joi.array().items(Joi.number().integer().positive()).optional(),
  requests: Joi.array().items(Joi.number().integer().positive()).optional(),
  delivery: Joi.array().items(Joi.number().integer().positive()).optional()
}))

export class UpdateProductsDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  subCategory?: string;
  brand?: string;
  model?: string;
  sku?: string;
  barcode?: string;
  weight?: number;
  dimensions?: string;
  imageUrl?: string;
  wareHouseId?: number;
  branchId?: number;
  sales?: number[];
  requests?: number[];
  delivery?: number[];
}


