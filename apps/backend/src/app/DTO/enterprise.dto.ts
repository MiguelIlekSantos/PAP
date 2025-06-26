import { JoiDtoSchema } from '../../lib';
import * as Joi from 'joi';



@JoiDtoSchema(Joi.object({
  legalName: Joi.string().required().messages({
    'string.empty': 'Legal name is required',
    'any.required': 'Legal name is required'
  }),
  comercialName: Joi.string().optional(),
  registerNumber: Joi.string().optional(),
  registerCountry: Joi.string().optional().length(2).messages({
    'string.length': 'Register country must be 2‑letter ISO code'
  }),
  registerType: Joi.string().optional(),
  type: Joi.string().optional(),
  foundationDate: Joi.date().iso().optional().messages({
    'date.format': 'Foundation date must be ISO format (YYYY‑MM‑DD)'
  }),
  mainLanguage: Joi.string().optional().length(2).messages({
    'string.length': 'Main language must be 2‑letter ISO code'
  }),
  oficialCurrency: Joi.string().optional().length(3).messages({
    'string.length': 'Official currency must be 3‑letter code'
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address'
  }),
  phone: Joi.string().optional(),
  logo: Joi.string().optional(),

  // Validação para arrays de IDs das relações
  branches: Joi.array().items(Joi.number().integer().positive()).optional(),
  wareHouses: Joi.array().items(Joi.number().integer().positive()).optional(),
  equipments: Joi.array().items(Joi.number().integer().positive()).optional(),
  transactions: Joi.array().items(Joi.number().integer().positive()).optional(),
  taxes: Joi.array().items(Joi.number().integer().positive()).optional(),
  clients: Joi.array().items(Joi.number().integer().positive()).optional(),
  suppliers: Joi.array().items(Joi.number().integer().positive()).optional(),
  transporters: Joi.array().items(Joi.number().integer().positive()).optional(),
  documents: Joi.array().items(Joi.number().integer().positive()).optional(),
  domains: Joi.array().items(Joi.number().integer().positive()).optional(),
  internSystems: Joi.array().items(Joi.number().integer().positive()).optional(),
  users: Joi.array().items(Joi.number().integer().positive()).optional(),
  campaigns: Joi.array().items(Joi.number().integer().positive()).optional(),
  socialMedia: Joi.array().items(Joi.number().integer().positive()).optional(),
  reports: Joi.array().items(Joi.number().integer().positive()).optional(),
}))
export class CreateEnterpriseDto {
  legalName: string;
  comercialName?: string;
  registerNumber?: string;
  registerCountry?: string;
  registerType?: string;
  type?: string;
  foundationDate?: string;
  mainLanguage?: string;
  oficialCurrency?: string;
  email?: string;
  phone?: string;
  logo?: string;

  branches?: number[];
  wareHouses?: number[];
  equipments?: number[];
  transactions?: number[];
  taxes?: number[];
  clients?: number[];
  suppliers?: number[];
  transporters?: number[];
  documents?: number[];
  domains?: number[];
  internSystems?: number[];
  users?: number[];
  campaigns?: number[];
  socialMedia?: number[];
  reports?: number[];

  constructor(legalName: string) {
    this.legalName = legalName;
  }
}

@JoiDtoSchema(Joi.object({
  legalName: Joi.string().optional(),
  comercialName: Joi.string().optional(),
  registerNumber: Joi.string().optional(),
  registerCountry: Joi.string().optional().length(2).messages({
    'string.length': 'Register country must be 2‑letter ISO code'
  }),
  registerType: Joi.string().optional(),
  type: Joi.string().optional(),
  foundationDate: Joi.date().iso().optional().messages({
    'date.format': 'Foundation date must be ISO format (YYYY‑MM‑DD)'
  }),
  mainLanguage: Joi.string().optional().length(2).messages({
    'string.length': 'Main language must be 2‑letter ISO code'
  }),
  oficialCurrency: Joi.string().optional().length(3).messages({
    'string.length': 'Official currency must be 3‑letter code'
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address'
  }),
  phone: Joi.string().optional(),
  logo: Joi.string().optional(),

  branches: Joi.array().items(Joi.number().integer().positive()).optional(),
  wareHouses: Joi.array().items(Joi.number().integer().positive()).optional(),
  equipments: Joi.array().items(Joi.number().integer().positive()).optional(),
  transactions: Joi.array().items(Joi.number().integer().positive()).optional(),
  taxes: Joi.array().items(Joi.number().integer().positive()).optional(),
  clients: Joi.array().items(Joi.number().integer().positive()).optional(),
  suppliers: Joi.array().items(Joi.number().integer().positive()).optional(),
  transporters: Joi.array().items(Joi.number().integer().positive()).optional(),
  documents: Joi.array().items(Joi.number().integer().positive()).optional(),
  domains: Joi.array().items(Joi.number().integer().positive()).optional(),
  internSystems: Joi.array().items(Joi.number().integer().positive()).optional(),
  users: Joi.array().items(Joi.number().integer().positive()).optional(),
  campaigns: Joi.array().items(Joi.number().integer().positive()).optional(),
  socialMedia: Joi.array().items(Joi.number().integer().positive()).optional(),
  reports: Joi.array().items(Joi.number().integer().positive()).optional(),
}))
export class UpdateEnterpriseDto {
  legalName?: string;
  comercialName?: string;
  registerNumber?: string;
  registerCountry?: string;
  registerType?: string;
  type?: string;
  foundationDate?: Date | null;
  mainLanguage?: string;
  oficialCurrency?: string;
  email?: string;
  phone?: string;
  logo?: string;

  branches?: number[];
  wareHouses?: number[];
  equipments?: number[];
  transactions?: number[];
  taxes?: number[];
  clients?: number[];
  suppliers?: number[];
  transporters?: number[];
  documents?: number[];
  domains?: number[];
  internSystems?: number[];
  users?: number[];
  campaigns?: number[];
  socialMedia?: number[];
  reports?: number[];
}
