import { JoiDtoSchema } from '@pap/utils';
import * as Joi from 'joi';

@JoiDtoSchema(Joi.object({
  Status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  }),
  Total: Joi.number().positive().required().messages({
    'number.base': 'Total must be a number',
    'number.positive': 'Total must be positive',
    'any.required': 'Total is required'
  }),
  PaymentMethod: Joi.string().required().messages({
    'string.empty': 'Payment method is required',
    'any.required': 'Payment method is required'
  }),
  lastPurchase: Joi.date().required().messages({
    'date.base': 'Last purchase must be a valid date',
    'any.required': 'Last purchase is required'
  }),
  ClientId: Joi.number().integer().positive().required().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive',
    'any.required': 'Client ID is required'
  })
}))

export class CreateSalesDto {}

@JoiDtoSchema(Joi.object({
  Status: Joi.string().optional(),
  Total: Joi.number().positive().optional().messages({
    'number.base': 'Total must be a number',
    'number.positive': 'Total must be positive'
  }),
  PaymentMethod: Joi.string().optional(),
  lastPurchase: Joi.date().optional().messages({
    'date.base': 'Last purchase must be a valid date'
  }),
  ClientId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Client ID must be a number',
    'number.integer': 'Client ID must be an integer',
    'number.positive': 'Client ID must be positive'
  })
}))

export class UpdateSalesDto {}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
}))

export class DeleteSalesDto {}