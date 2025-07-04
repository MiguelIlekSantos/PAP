import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';


@JoiDtoSchema(Joi.object({
  licensePlate: Joi.string().required().messages({
    'string.empty': 'License Plate is required',
    'any.required': 'License Plate is required'
  }),
  vehicleType: Joi.string().optional(),
  status: Joi.string().optional(),
  extEnterprise: Joi.string().optional(),
  phone: Joi.string().optional(),
  representative: Joi.string().optional(),
  operationArea: Joi.string().optional(),
  pricePerKm: Joi.number().positive().optional().messages({
    'number.base': 'Price per km must be a number',
    'number.positive': 'Price per km must be positive'
  }),
  rating: Joi.number().min(0).max(5).optional().messages({
    'number.base': 'Rating must be a number',
    'number.min': 'Rating must be at least 0',
    'number.max': 'Rating cannot exceed 5'
  }),
  delivery: Joi.array().items(Joi.number()).optional(),
  enterpriseId: Joi.number().integer().required()
}))

export class CreateTransportersDto {
  licensePlate: string;
  vehicleType?: string;
  status?: string;
  extEnterprise?: string;
  phone?: string;
  representative?: string;
  operationArea?: string;
  pricePerKm?: number;
  rating?: number;
  delivery?: number[];
  enterpriseId: number;

  constructor(licensePlate: string, enterpriseId: number) {
    this.licensePlate = licensePlate;
    this.enterpriseId = enterpriseId;
  }
}

@JoiDtoSchema(Joi.object({
  licensePlate: Joi.string().optional(),
  vehicleType: Joi.string().optional(),
  status: Joi.string().optional(),
  extEnterprise: Joi.string().optional(),
  phone: Joi.string().optional(),
  representative: Joi.string().optional(),
  operationArea: Joi.string().optional(),
  pricePerKm: Joi.number().positive().optional().messages({
    'number.base': 'Price per km must be a number',
    'number.positive': 'Price per km must be positive'
  }),
  rating: Joi.number().min(0).max(5).optional().messages({
    'number.base': 'Rating must be a number',
    'number.min': 'Rating must be at least 0',
    'number.max': 'Rating cannot exceed 5'
  }),
  delivery: Joi.array().items(Joi.number()).optional()
}))

export class UpdateTransportersDto {
  licensePlate?: string;
  vehicleType?: string;
  status?: string;
  extEnterprise?: string;
  phone?: string;
  representative?: string;
  operationArea?: string;
  pricePerKm?: number;
  rating?: number;
  delivery?: number[];
}
