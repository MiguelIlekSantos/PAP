import { JoiDtoSchema } from '@pap/utils';
import * as Joi from 'joi';

export interface EnterpriseDTO {
  id: number;
  legalName: string;
  ComercialName?: string;
  nif?: string;
  niss?: string;
  nipc?: string;
  type?: string;
  foundationDate?: Date | null;
  registeredCountry?: string;
  mainLanguage?: string;
  oficialCurrency?: string;
  email?: string;
  phone?: string;
  logo?: string;
}

@JoiDtoSchema(Joi.object({
  legalName: Joi.string().required(),
  ComercialName: Joi.string(),
  nif: Joi.string().pattern(/^\d{9}$/).messages({ 'string.pattern.base': 'NIF must be a 9-digit number' }),
  niss: Joi.string().pattern(/^\d{11}$/).messages({ 'string.pattern.base': 'NISS must be an 11-digit number' }),
  nipc: Joi.string().pattern(/^\d{9}$/).messages({ 'string.pattern.base': 'NIPC must be a 9-digit number' }),
  type: Joi.string(),
  foundationDate: Joi.string().isoDate().messages({ 'date.format': 'Foundation date must be in this format 2025-02-11T19:58:54.595Z' }),
  registeredCountry: Joi.string(),
  mainLanguage: Joi.string(),
  oficialCurrency: Joi.string(),
  email: Joi.string().email().messages({ 'string.email': 'Email must be a valid email address' }),
  phone: Joi.string(),
  logo: Joi.string()
}))

export class CreateEnterpriseDto {
  legalName: string;
  ComercialName?: string;
  nif?: string;
  niss?: string;
  nipc?: string;
  type?: string;
  foundationDate?: string;
  registeredCountry?: string;
  mainLanguage?: string;
  oficialCurrency?: string;
  email?: string;
  phone?: string;
  logo?: string;
  
  constructor(legalName: string) {
    this.legalName = legalName
  }
}

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

export class UpdateEnterpriseDto {
  legalName?: string;
  ComercialName?: string;
  nif?: string;
  niss?: string;
  nipc?: string;
  type?: string;
  foundationDate?: Date | null;
  registeredCountry?: string;
  mainLanguage?: string;
  oficialCurrency?: string;
  email?: string;
  phone?: string;
  logo?: string;
}

@JoiDtoSchema(Joi.object({
  id: Joi.number().integer().positive().required().messages({ 'number.base': 'ID must be a number', 'number.integer': 'ID must be an integer', 'number.positive': 'ID must be positive', 'any.required': 'ID is required' })
}))

export class DeleteEnterpriseDto {
  id: number;
  
  constructor(id: number) {
    this.id = id;
  }
}