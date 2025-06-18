import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';


@JoiDtoSchema(
  Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  capacity: Joi.number().integer().positive().required().messages({'number.base': 'Capacity must be a number','number.integer': 'Capacity must be an integer','number.positive': 'Capacity must be positive'}),
  currentStock: Joi.number().integer().min(0).required().messages({'number.base': 'Current stock must be a number','number.integer': 'Current stock must be an integer','number.min': 'Current stock must be at least 0'}),
  section: Joi.number().integer().positive().required().messages({'number.base': 'Section must be a number','number.integer': 'Section must be an integer','number.positive': 'Section must be positive'}),
  responsible: Joi.string().required(),
  status: Joi.string().required().messages({
  })
}))

export class CreateWareHousesDto {}


@JoiDtoSchema(
  Joi.object({
  name: Joi.string().optional(),
  location: Joi.string().optional(),
  capacity: Joi.number().integer().positive().optional().messages({'number.base': 'Capacity must be a number','number.integer': 'Capacity must be an integer','number.positive': 'Capacity must be positive'}),
  currentStock: Joi.number().integer().min(0).optional().messages({'number.base': 'Current stock must be a number','number.integer': 'Current stock must be an integer','number.min': 'Current stock must be at least 0'}),
  section: Joi.number().integer().positive().optional().messages({'number.base': 'Section must be a number','number.integer': 'Section must be an integer','number.positive': 'Section must be positive'}),
  responsible: Joi.string().optional(),
  status: Joi.string().optional()
}))

export class UpdateWareHousesDto {}


@JoiDtoSchema(
  Joi.object({
    id: Joi.number().integer().positive().required().messages({'number.base': 'ID must be a number','number.integer': 'ID must be an integer','number.positive': 'ID must be positive'})
  }))
  
  
export class DeleteWareHousesDto {}


