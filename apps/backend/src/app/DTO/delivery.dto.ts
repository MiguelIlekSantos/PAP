import { JoiDtoSchema } from '@pap/utils';
import * as Joi from 'joi';

@JoiDtoSchema(Joi.object({
  expectedDate: Joi.date().required().messages({
    'date.base': 'Expected date must be a valid date',
    'any.required': 'Expected date is required'
  }),
  deliveryDate: Joi.date().required().messages({
    'date.base': 'Delivery date must be a valid date',
    'any.required': 'Delivery date is required'
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  }),
  clientId: Joi.number().integer().positive().required().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive',
    'any.required': 'Client ID is required'
  }),
  transporterId: Joi.number().integer().positive().required().messages({
    'number.base': 'Transporter ID must be a number',
    'number.integer': 'Transporter ID must be an integer',
    'number.positive': 'Transporter ID must be positive',
    'any.required': 'Transporter ID is required'
  })
}))

export class CreateDeliveryDto {}

@JoiDtoSchema(Joi.object({
  expectedDate: Joi.date().optional().messages({
    'date.base': 'Expected date must be a valid date'
  }),
  deliveryDate: Joi.date().optional().messages({
    'date.base': 'Delivery date must be a valid date'
  }),
  status: Joi.string().optional(),
  clientId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive'
  }),
  transporterId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Transporter ID must be a number',
    'number.integer': 'Transporter ID must be an integer',
    'number.positive': 'Transporter ID must be positive'
  })
}))

export class UpdateDeliveryDto {}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
}))

export class DeleteDeliveryDto {}