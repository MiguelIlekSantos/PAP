import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';



@JoiDtoSchema(Joi.object({
  content: Joi.string().required().messages({ 'string.empty': 'Content is required', 'any.required': 'Content is required' }),
  sender: Joi.string().optional(),
  createdAt: Joi.date().optional().messages({ 'date.base': 'Created at must be a valid date' }),
  chatId: Joi.number().integer().positive().required().messages({ 'number.base': 'Chat ID must be a number', 'number.integer': 'Chat ID must be an integer', 'number.positive': 'Chat ID must be positive' })
}))

export class CreateMessagesDto {
  content: string;
  sender?: string;
  createdAt?: Date;
  chatId: number;
  
  constructor(content: string, chatId: number) {
    this.content = content;
    this.chatId = chatId;
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


