import * as Joi from 'joi';

export const CreateProductsDto = Joi.object({
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
  stock: Joi.number().integer().min(0).required().messages({
    'number.base': 'Stock must be a number',
    'number.integer': 'Stock must be an integer',
    'number.min': 'Stock must be at least 0',
    'any.required': 'Stock is required'
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
  barcode: Joi.string().required().messages({
    'string.empty': 'Barcode is required',
    'any.required': 'Barcode is required'
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
  wareHouseId: Joi.number().integer().positive().required().messages({
    'number.base': 'Warehouse ID must be a number',
    'number.integer': 'Warehouse ID must be an integer',
    'number.positive': 'Warehouse ID must be positive',
    'any.required': 'Warehouse ID is required'
  })
});

export const UpdateProductsDto = Joi.object({
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
  })
});

export const DeleteProductsDto = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
});