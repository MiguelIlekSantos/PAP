import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';


@JoiDtoSchema(Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  path: Joi.string().required(),
  type: Joi.string().optional(),
  frequency: Joi.string().optional(),
  status: Joi.string().optional(),
  lastUpdate: Joi.date().optional().messages({
    'date.base': 'Last update must be a valid date'
  }),
  nextUpdate: Joi.date().optional().messages({
    'date.base': 'Next update must be a valid date'
  }),
  downloads: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Downloads must be a number',
    'number.integer': 'Downloads must be an integer',
    'number.min': 'Downloads must be at least 0'
  }),
  enterpriseId: Joi.number().integer().positive().required().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive'}),
}))

export class CreateReportsDto {
  name: string;
  path: string;
  type?: string;
  frequency?: string;
  status?: string;
  lastUpdate?: Date;
  nextUpdate?: Date;
  downloads?: number;
  enterpriseId: number;
  
  constructor(name: string, path: string, enterpriseId: number) {
    this.name = name;
    this.path = path;
    this.enterpriseId = enterpriseId;
  }
}

@JoiDtoSchema(Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  frequency: Joi.string().optional(),
  status: Joi.string().optional(),
  lastUpdate: Joi.date().optional().messages({
    'date.base': 'Last update must be a valid date'
  }),
  nextUpdate: Joi.date().optional().messages({
    'date.base': 'Next update must be a valid date'
  }),
  downloads: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Downloads must be a number',
    'number.integer': 'Downloads must be an integer',
    'number.min': 'Downloads must be at least 0'
  }),
  path: Joi.string().optional(),
  enterpriseId: Joi.number().integer().positive().required().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive'}),
}))

export class UpdateReportsDto {
  name?: string;
  type?: string;
  frequency?: string;
  status?: string;
  lastUpdate?: Date;
  nextUpdate?: Date;
  downloads?: number;
  path?: string;
  enterpriseId?: number;
}


