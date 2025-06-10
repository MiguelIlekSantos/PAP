
import { JoiDtoSchema } from '@pap/utils';
import * as Joi from 'joi';

@JoiDtoSchema(Joi.object({
  legalName: Joi.string().required(),
  ComercialName: Joi.string().required(),
  nif: Joi.string().pattern(/^\d{9}$/).required().messages({ 'string.pattern.base': 'NIF must be a 9-digit number' }),
  niss: Joi.string().pattern(/^\d{11}$/).required().messages({ 'string.pattern.base': 'NISS must be an 11-digit number' }),
  nipc: Joi.string().pattern(/^\d{9}$/).required().messages({ 'string.pattern.base': 'NIPC must be a 9-digit number' }),
  type: Joi.string().required(),
  foundationDate: Joi.date().iso().required().messages({ 'date.format': 'Foundation date must be in ISO format (YYYY-MM-DD)' }),
  registeredCountry: Joi.string().required(),
  mainLanguage: Joi.string().required(),
  oficialCurrency: Joi.string().required(),
  email: Joi.string().email().required().messages({ 'string.email': 'Email must be a valid email address' }),
  phone: Joi.string().required(),
  logo: Joi.string().required()
}))

export class CreateEnterpriseDto {}


@JoiDtoSchema(Joi.object({
  legalName: Joi.string().optional(),
  ComercialName: Joi.string().optional(),
  nif: Joi.string().pattern(/^\d{9}$/).optional().messages({ 'string.pattern.base': 'NIF must be a 9-digit number' }),
  niss: Joi.string().pattern(/^\d{11}$/).optional().messages({ 'string.pattern.base': 'NISS must be an 11-digit number' }),
  nipc: Joi.string().pattern(/^\d{9}$/).optional().messages({ 'string.pattern.base': 'NIPC must be a 9-digit number' }),
  type: Joi.string().optional(),
  foundationDate: Joi.date().iso().optional().messages({ 'date.format': 'Foundation date must be in ISO format (YYYY-MM-DD)' }),
  registeredCountry: Joi.string().optional(),
  mainLanguage: Joi.string().optional(),
  oficialCurrency: Joi.string().optional(),
  email: Joi.string().email().optional().messages({ 'string.email': 'Email must be a valid email address' }),
  phone: Joi.string().optional(),
  logo: Joi.string().optional()
}))

export class UpdateEnterpriseDto {}


@JoiDtoSchema(Joi.object({
    id: Joi.number().integer().positive().required()
}))

export class DeleteEnterpriseDto {}