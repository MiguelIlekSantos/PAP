import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

@JoiDtoSchema(Joi.object({
  projectId: Joi.number().integer().positive().required().messages({ 'number.base': 'Project ID must be a number', 'number.integer': 'Project ID must be an integer', 'number.positive': 'Project ID must be positive', 'any.required': 'Project ID is required' }),
  messages: Joi.array().items(Joi.number().integer().positive()).optional(),
}))

export class CreateChatsDto {
  projectId: number;
  messages?: number[];

  constructor(projectId: number) {
    this.projectId = projectId;
  }
}

@JoiDtoSchema(Joi.object({
  projectId: Joi.number().integer().positive().optional().messages({ 'number.base': 'Project ID must be a number', 'number.integer': 'Project ID must be an integer', 'number.positive': 'Project ID must be positive' }),
  messages: Joi.array().items(Joi.number().integer().positive()).optional(),
}))

export class UpdateChatsDto {
  projectId?: number;
  messages?: number[];
}

