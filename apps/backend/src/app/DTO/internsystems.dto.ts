import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';



@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'Name is required', 'any.required': 'Name is required' }),
  type: Joi.string().required().messages({ 'string.empty': 'Type is required', 'any.required': 'Type is required' }),
  version: Joi.string().required().messages({ 'string.empty': 'Version is required', 'any.required': 'Version is required' }),
  environment: Joi.string().required().messages({ 'string.empty': 'Environment is required', 'any.required': 'Environment is required' }),
  tecnology: Joi.string().required().messages({ 'string.empty': 'Technology is required', 'any.required': 'Technology is required' }),
  status: Joi.string().required().messages({ 'string.empty': 'Status is required', 'any.required': 'Status is required' }),
  logs: Joi.array().items(Joi.number().integer().positive()).optional(),
  enterpriseId: Joi.number().integer().positive().required().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive'}),
}))

export class CreateInternSystemsDto {
  name: string;
  type?: string;
  version?: string;
  environment?: string;
  tecnology?: string;
  status?: string;
  logs?: number[]
  enterpriseId: number
  
  constructor(name: string, enterpriseId: number) {
    this.name = name;
    this.enterpriseId = enterpriseId;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  version: Joi.string().optional(),
  environment: Joi.string().optional(),
  tecnology: Joi.string().optional(),
  status: Joi.string().optional(),
  logs: Joi.array().items(Joi.number().integer().positive()).optional(),
    enterpriseId: Joi.number().integer().positive().optional().messages({'number.base': 'Transporter ID must be a number','number.integer': 'Transporter ID must be an integer','number.positive': 'Transporter ID must be positive'}),
}))

export class UpdateInternSystemsDto {
  name?: string;
  type?: string;
  version?: string;
  environment?: string;
  tecnology?: string;
  status?: string;
  logs?: number[];
  enterpriseId?: number;
}


