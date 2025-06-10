import { JoiDtoSchema } from '@pap/utils';
import * as Joi from 'joi';

@JoiDtoSchema(
  Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({'string.min': 'Password must be at least 6 characters long'}),
  permissions: Joi.string().required(),
  role: Joi.string().required(),
  active: Joi.boolean().required().messages({'boolean.base': 'Active must be a boolean'})
}))

export class CreateUserDto {}


@JoiDtoSchema(
  Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional().messages({'string.email': 'Email must be a valid email address'}),
  password: Joi.string().min(6).optional().messages({'string.min': 'Password must be at least 6 characters long'}),
  permissions: Joi.string().optional(),
  role: Joi.string().optional(),
  active: Joi.boolean().optional().messages({'boolean.base': 'Active must be a boolean'})
}))

export class UpdateUserDto {}


@JoiDtoSchema(
  Joi.object({
    id: Joi.number().integer().positive().required().messages({
      'number.base': 'ID must be a number',
      'number.integer': 'ID must be an integer',
      'number.positive': 'ID must be positive'
    })
  }))
  
export class DeleteUserDto {}

