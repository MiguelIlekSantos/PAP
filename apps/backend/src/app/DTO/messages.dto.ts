import { JoiDtoSchema } from '@pap/utils';
import * as Joi from 'joi';

export interface MessagesDTO {
  id: number;
  content: string;
  sender: string;
  createdAt: Date;
  chatId: number;
}

@JoiDtoSchema(Joi.object({
  content: Joi.string().required().messages({ 'string.empty': 'Content is required', 'any.required': 'Content is required' }),
  sender: Joi.string().required().messages({ 'string.empty': 'Sender is required', 'any.required': 'Sender is required' }),
  createdAt: Joi.date().required().messages({ 'date.base': 'Created at must be a valid date', 'any.required': 'Created at is required' }),
  chatId: Joi.number().integer().positive().required().messages({ 'number.base': 'Chat ID must be a number', 'number.integer': 'Chat ID must be an integer', 'number.positive': 'Chat ID must be positive', 'any.required': 'Chat ID is required' })
}))

export class CreateMessagesDto {
  content: string;
  sender?: string;
  createdAt?: Date;
  chatId?: number;
  
  constructor(content: string) {
    this.content = content;
  }
}

@JoiDtoSchema(Joi.object({
  content: Joi.string().optional(),
  sender: Joi.string().optional(),
  createdAt: Joi.date().optional().messages({ 'date.base': 'Created at must be a valid date' }),
  chatId: Joi.number().integer().positive().optional().messages({ 'number.base': 'Chat ID must be a number', 'number.integer': 'Chat ID must be an integer', 'number.positive': 'Chat ID must be positive' })
}))

export class UpdateMessagesDto {
  content?: string;
  sender?: string;
  createdAt?: Date;
  chatId?: number;
}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({ 'number.base': 'ID must be a number', 'number.integer': 'ID must be an integer', 'number.positive': 'ID must be positive', 'any.required': 'ID is required' })
}))

export class DeleteMessagesDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}