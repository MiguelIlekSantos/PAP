import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface TransactionsDTO {
  id: number;
  amount: number;
  date: Date;
  bankAccount: string;
  category: string;
  description: string;
  status: string;
  enterpriseId: number;
}

@JoiDtoSchema(Joi.object({
  amount: Joi.number().required().messages({
    'number.base': 'Amount must be a number',
    'any.required': 'Amount is required'
  }),
  date: Joi.date().required().messages({
    'date.base': 'Date must be a valid date'
  }),
  bankAccount: Joi.string().required(),
  category: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().optional(),
  enterpriseId: Joi.number().integer().positive().required().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive'}),
}))

export class CreateTransactionsDto {
  amount: number;
  date: Date;
  bankAccount: string;
  category?: string;
  description?: string;
  status?: string;
  enterpriseId: number;

  constructor(amount: number, date: Date, bankAccount: string, enterpriseId: number) {
    this.amount = amount;
    this.date = date;
    this.bankAccount = bankAccount;
    this.enterpriseId = enterpriseId;
  }
}

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

export class UpdateTransactionsDto {
  amount?: number;
  date?: Date;
  category?: string;
  description?: string;
  bankAccount?: string;
  status?: string;
}
