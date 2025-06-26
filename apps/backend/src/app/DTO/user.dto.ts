import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';



@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address'
  }),
  password: Joi.string().min(6).optional().messages({
    'string.min': 'Password must be at least 6 characters long'
  }),
  permissions: Joi.string().optional(),
  role: Joi.string().optional(),
  active: Joi.boolean().optional().messages({
    'boolean.base': 'Active must be a boolean'
  }),
  logs: Joi.array().items(Joi.number()).optional(),
  enterpriseId: Joi.number().integer().positive().required().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive'}),
}))

export class CreateUserDto {
  name: string;
  email?: string;
  password?: string;
  permissions?: string;
  role?: string;
  active?: boolean;
  logs?: number[];
  enterpriseId: number;
  
  constructor(name: string, enterpriseId: number) {
    this.name = name;
    this.enterpriseId = enterpriseId;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional().messages({'string.email': 'Email must be a valid email address'}),
  password: Joi.string().min(6).optional().messages({'string.min': 'Password must be at least 6 characters long'}),
  permissions: Joi.string().optional(),
  role: Joi.string().optional(),
  active: Joi.boolean().optional().messages({'boolean.base': 'Active must be a boolean'}),
    logs: Joi.array().items(Joi.number()).optional(),
}))

export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  permissions?: string;
  role?: string;
  active?: boolean;
  logs?: number[]
}


