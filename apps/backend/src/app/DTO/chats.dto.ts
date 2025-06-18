import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';

export interface ChatsDTO {
  id: number;
  projectId: number;
}

@JoiDtoSchema(Joi.object({
  projectId: Joi.number().integer().positive().required().messages({ 'number.base': 'Project ID must be a number', 'number.integer': 'Project ID must be an integer', 'number.positive': 'Project ID must be positive', 'any.required': 'Project ID is required' })
}))

export class CreateChatsDto {
  projectId: number;
  
  constructor(projectId: number) {
    this.projectId = projectId;
  }
}

@JoiDtoSchema(Joi.object({
  projectId: Joi.number().integer().positive().optional().messages({ 'number.base': 'Project ID must be a number', 'number.integer': 'Project ID must be an integer', 'number.positive': 'Project ID must be positive' })
}))

export class UpdateChatsDto {
  projectId?: number;
}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({ 'number.base': 'ID must be a number', 'number.integer': 'ID must be an integer', 'number.positive': 'ID must be positive', 'any.required': 'ID is required' })
}))

export class DeleteChatsDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}
