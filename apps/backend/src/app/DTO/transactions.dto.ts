import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';


export interface TransactionsDto {
  amount: number
  date: string
  category: string
  description: string
  bankAccount: string
  status: string
}


@JoiDtoSchema(Joi.object({
  amount: Joi.number().required().messages({
    'number.base': 'Amount must be a number',
    'any.required': 'Amount is required'
  }),
  date: Joi.date().required().messages({
    'date.base': 'Date must be a valid date',
    'any.required': 'Date is required'
  }),
  category: Joi.string().required().messages({
    'string.empty': 'Category is required',
    'any.required': 'Category is required'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
    'any.required': 'Description is required'
  }),
  bankAccount: Joi.string().required().messages({
    'string.empty': 'Bank account is required',
    'any.required': 'Bank account is required'
  }),
  status: Joi.string().required().messages({
    'string.empty': 'Status is required',
    'any.required': 'Status is required'
  })
}))

export class CreateTransactionsDto {}

@JoiDtoSchema(Joi.object({
  amount: Joi.number().optional().messages({
    'number.base': 'Amount must be a number'
  }),
  date: Joi.date().optional().messages({
    'date.base': 'Date must be a valid date'
  }),
  category: Joi.string().optional(),
  description: Joi.string().optional(),
  bankAccount: Joi.string().optional(),
  status: Joi.string().optional()
}))

export class UpdateTransactionsDto {}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
}))

export class DeleteTransactionsDto {}
