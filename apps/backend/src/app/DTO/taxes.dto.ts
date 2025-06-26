import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';



@JoiDtoSchema(Joi.object({
  type: Joi.string().required().messages({
    'string.empty': 'Type is required',
    'any.required': 'Type is required'
  }),
  period: Joi.string().optional(),
  description: Joi.string().optional(),
  endDate: Joi.date().optional().messages({
    'date.base': 'End date must be a valid date'
  }),
  amount: Joi.number().positive().required().messages({
    'number.base': 'Amount must be a number',
    'number.positive': 'Amount must be positive'
  }),
  enterpriseId: Joi.number().integer().positive().required().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive'}),
}))

export class CreateTaxesDto {
  type: string;
  period?: string;
  description?: string;
  endDate?: Date;
  amount: number;
  enterpriseId: number;

  constructor(type: string, amount: number, enterpriseId: number) {
    this.type = type;
    this.amount = amount;
    this.enterpriseId = enterpriseId;
  }
}

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

export class UpdateTaxesDto {
  type?: string;
  period?: string;
  description?: string;
  endDate?: Date;
  amount?: number;
}
