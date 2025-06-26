import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';


@JoiDtoSchema(Joi.object({
  platform: Joi.string().required().messages({
    'string.empty': 'Platform is required',
    'any.required': 'Platform is required'
  }),
  username: Joi.string().optional(),
  followers: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Followers must be a number',
    'number.integer': 'Followers must be an integer',
    'number.min': 'Followers must be at least 0'
  }),
  engagementRate: Joi.number().min(0).max(100).optional().messages({
    'number.base': 'Engagement rate must be a number',
    'number.min': 'Engagement rate must be at least 0',
    'number.max': 'Engagement rate cannot exceed 100'
  }),
  enterpriseId: Joi.number().integer().positive().required().messages({'number.base': 'Enterprise ID must be a number','number.integer': 'Enterprise ID must be an integer','number.positive': 'Enterprise ID must be positive'}),
}))

export class CreateSocialMediaDto {
  platform: string;
  username?: string;
  followers?: number;
  engagementRate?: number;
  enterpriseId: number;
  
  constructor(platform: string, enterpriseId: number) {
    this.platform = platform;
    this.enterpriseId = enterpriseId;
  }
}

@JoiDtoSchema(Joi.object({
  platform: Joi.string().optional(),
  username: Joi.string().optional(),
  followers: Joi.number().integer().min(0).optional().messages({
    'number.base': 'Followers must be a number',
    'number.integer': 'Followers must be an integer',
    'number.min': 'Followers must be at least 0'
  }),
  engagementRate: Joi.number().min(0).max(100).optional().messages({
    'number.base': 'Engagement rate must be a number',
    'number.min': 'Engagement rate must be at least 0',
    'number.max': 'Engagement rate cannot exceed 100'
  }),
}))

export class UpdateSocialMediaDto {
  platform?: string;
  username?: string;
  followers?: number;
  engagementRate?: number;
}


