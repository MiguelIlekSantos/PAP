import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'Name is required', 'any.required': 'Name is required' }),
  amount: Joi.number().positive().required().messages({ 'number.base': 'Amount must be a number', 'number.positive': 'Amount must be positive', 'any.required': 'Amount is required' }),
  usedAmount: Joi.number().min(0).required().messages({ 'number.base': 'Used amount must be a number', 'number.min': 'Used amount must be at least 0', 'any.required': 'Used amount is required' }),
  remainingAmount: Joi.number().min(0).required().messages({ 'number.base': 'Remaining amount must be a number', 'number.min': 'Remaining amount must be at least 0', 'any.required': 'Remaining amount is required' }),
  status: Joi.string().required().messages({ 'string.empty': 'Status is required', 'any.required': 'Status is required' }),
  period: Joi.string().required().messages({ 'string.empty': 'Period is required', 'any.required': 'Period is required' }),
  category: Joi.string().required().messages({ 'string.empty': 'Category is required', 'any.required': 'Category is required' }),
  projectId: Joi.number().integer().positive().optional().messages({ 'number.base': 'Project ID must be a number', 'number.integer': 'Project ID must be an integer', 'number.positive': 'Project ID must be positive' }),
  campaignId: Joi.number().integer().positive().optional().messages({ 'number.base': 'Campaign ID must be a number', 'number.integer': 'Campaign ID must be an integer', 'number.positive': 'Campaign ID must be positive' }),

}))

export class CreateBudgetDto {
  name: string;
  amount?: number;
  usedAmount?: number;
  remainingAmount?: number;
  status?: string;
  period?: string;
  category?: string;
  projectId?: number;
  campaignId?: number;

  constructor(name: string) {
    this.name = name;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  amount: Joi.number().positive().optional().messages({ 'number.base': 'Amount must be a number', 'number.positive': 'Amount must be positive' }),
  usedAmount: Joi.number().min(0).optional().messages({ 'number.base': 'Used amount must be a number', 'number.min': 'Used amount must be at least 0' }),
  remainingAmount: Joi.number().min(0).optional().messages({ 'number.base': 'Remaining amount must be a number', 'number.min': 'Remaining amount must be at least 0' }),
  status: Joi.string().optional(),
  period: Joi.string().optional(),
  category: Joi.string().optional(),
  projectId: Joi.number().integer().positive().optional().messages({ 'number.base': 'Project ID must be a number', 'number.integer': 'Project ID must be an integer', 'number.positive': 'Project ID must be positive' }),
  campaignId: Joi.number().integer().positive().optional().messages({ 'number.base': 'Campaign ID must be a number', 'number.integer': 'Campaign ID must be an integer', 'number.positive': 'Campaign ID must be positive' }),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional()
}))

export class UpdateBudgetDto {
  name?: string;
  amount?: number;
  usedAmount?: number;
  remainingAmount?: number;
  status?: string;
  period?: string;
  category?: string;
  projectId?: number;
  campaignId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
