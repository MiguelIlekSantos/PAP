import { JoiDtoSchema } from '@pap/utils';
import * as Joi from 'joi';

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  permissions: string;
  role: string;
  active: boolean;
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({'string.min': 'Password must be at least 6 characters long'}),
  permissions: Joi.string().required(),
  role: Joi.string().required(),
  active: Joi.boolean().required().messages({'boolean.base': 'Active must be a boolean'})
}))

export class CreateUserDto {
  name: string;
  email?: string;
  password?: string;
  permissions?: string;
  role?: string;
  active?: boolean;
  
  constructor(name: string) {
    this.name = name;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional().messages({'string.email': 'Email must be a valid email address'}),
  password: Joi.string().min(6).optional().messages({'string.min': 'Password must be at least 6 characters long'}),
  permissions: Joi.string().optional(),
  role: Joi.string().optional(),
  active: Joi.boolean().optional().messages({'boolean.base': 'Active must be a boolean'})
}))

export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  permissions?: string;
  role?: string;
  active?: boolean;
}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive'
  })
}))
  
export class DeleteUserDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}