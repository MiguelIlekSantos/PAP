import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  type: Joi.string().optional(),
  registrator: Joi.string().optional(),
  expirationDate: Joi.date().optional().messages({
    'date.base': 'Expiration date must be a valid date'
  }),
  hosting: Joi.string().optional(),
  status: Joi.string().optional(),
  enterpriseId: Joi.number().integer().positive().required().messages({
    'number.base': 'Enterprise ID must be a number',
    'number.integer': 'Enterprise ID must be an integer',
    'number.positive': 'Enterprise ID must be positive',
    'any.required': 'Enterprise ID is required'
  })
}))
export class CreateDomainsDto {
  name: string;
  enterpriseId: number;
  type?: string;
  registrator?: string;
  expirationDate?: Date;
  hosting?: string;
  status?: string;

  constructor(name: string, enterpriseId: number) {
    this.name = name;
    this.enterpriseId = enterpriseId;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  registrator: Joi.string().optional(),
  expirationDate: Joi.date().optional().messages({
    'date.base': 'Expiration date must be a valid date'
  }),
  hosting: Joi.string().optional(),
  status: Joi.string().optional(),
  enterpriseId: Joi.number().integer().positive().optional().messages({
    'number.base': 'Enterprise ID must be a number',
    'number.integer': 'Enterprise ID must be an integer',
    'number.positive': 'Enterprise ID must be positive'
  })
}))
export class UpdateDomainsDto {
  name?: string;
  type?: string;
  registrator?: string;
  expirationDate?: Date;
  hosting?: string;
  status?: string;
  enterpriseId?: number;
}
