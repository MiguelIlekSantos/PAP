import { JoiDtoSchema } from '@pap/utils';
import * as Joi from 'joi';

@JoiDtoSchema(Joi.object({
  type: Joi.string().required().messages({
    'string.empty': 'Type is required',
    'any.required': 'Type is required'
  }),
  period: Joi.string().required().messages({
    'string.empty': 'Period is required',
    'any.required': 'Period is required'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
    'any.required': 'Description is required'
  }),
  endDate: Joi.date().required().messages({
    'date.base': 'End date must be a valid date',
    'any.required': 'End date is required'
  }),
  amount: Joi.number().positive().required().messages({
    'number.base': 'Amount must be a number',
    'number.positive': 'Amount must be positive',
    'any.required': 'Amount is required'
  })
}))

export class CreateTaxesDto {}

@JoiDtoSchema(Joi.object({
  type: Joi.string().optional(),
  period: Joi.string().optional(),
  description: Joi.string().optional(),
  endDate: Joi.date().optional().messages({
    'date.base': 'End date must be a valid date'
  }),
  amount: Joi.number().positive().optional().messages({
    'number.base': 'Amount must be a number',
    'number.positive': 'Amount must be positive'
  })
}))

export class UpdateTaxesDto {}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
}))

export class DeleteTaxesDto {}