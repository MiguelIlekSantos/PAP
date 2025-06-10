import { JoiDtoSchema } from '@pap/utils';
import * as Joi from 'joi';

@JoiDtoSchema(
  Joi.object({
  vehicleType: Joi.string().required(),
  status: Joi.string().required(),
  extEnterprise: Joi.string().required(),
  phone: Joi.string().required(),
  representative: Joi.string().required(),
  operationArea: Joi.string().required(),
  pricePerKm: Joi.number().positive().required(),
  rating: Joi.number().min(0).max(5).required().messages({'number.base': 'Rating must be a number', 'number.min': 'Rating must be at least 0', 'number.max': 'Rating cannot exceed 5'})
}))

export class CreateTransportersDto {}


@JoiDtoSchema(Joi.object({
  vehicleType: Joi.string().optional(),
  status: Joi.string().optional(),
  extEnterprise: Joi.string().optional(),
  phone: Joi.string().optional(),
  representative: Joi.string().optional(),
  operationArea: Joi.string().optional(),
  pricePerKm: Joi.number().positive().optional().messages({'number.base': 'Price per km must be a number', 'number.positive': 'Price per km must be positive'}),
  rating: Joi.number().min(0).max(5).optional().messages({'number.base': 'Rating must be a number', 'number.min': 'Rating must be at least 0', 'number.max': 'Rating cannot exceed 5'})
}))

export class UpdateTransportersDto {}


@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
}))

export class DeleteTransportersDto {}