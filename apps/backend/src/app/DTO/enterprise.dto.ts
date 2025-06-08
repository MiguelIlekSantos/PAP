import * as Joi from 'joi';

export const CreateEnterpriseDto = Joi.object({
  legalName: Joi.string().required().messages({
    'string.empty': 'Legal name is required',
    'any.required': 'Legal name is required'
  }),
  ComercialName: Joi.string().required().messages({
    'string.empty': 'Commercial name is required',
    'any.required': 'Commercial name is required'
  }),
  nif: Joi.string().required().messages({
    'string.empty': 'NIF is required',
    'any.required': 'NIF is required'
  }),
  niss: Joi.string().required().messages({
    'string.empty': 'NISS is required',
    'any.required': 'NISS is required'
  }),
  nipc: Joi.string().required().messages({
    'string.empty': 'NIPC is required',
    'any.required': 'NIPC is required'
  }),
  type: Joi.string().required().messages({
    'string.empty': 'Type is required',
    'any.required': 'Type is required'
  }),
  foundationDate: Joi.date().required().messages({
    'date.base': 'Foundation date must be a valid date',
    'any.required': 'Foundation date is required'
  }),
  registeredCountry: Joi.string().required().messages({
    'string.empty': 'Registered country is required',
    'any.required': 'Registered country is required'
  }),
  mainLanguage: Joi.string().required().messages({
    'string.empty': 'Main language is required',
    'any.required': 'Main language is required'
  }),
  oficialCurrency: Joi.string().required().messages({
    'string.empty': 'Official currency is required',
    'any.required': 'Official currency is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Phone is required',
    'any.required': 'Phone is required'
  }),
  logo: Joi.string().required().messages({
    'string.empty': 'Logo is required',
    'any.required': 'Logo is required'
  })
});

export const UpdateEnterpriseDto = Joi.object({
  legalName: Joi.string().optional(),
  ComercialName: Joi.string().optional(),
  nif: Joi.string().optional(),
  niss: Joi.string().optional(),
  nipc: Joi.string().optional(),
  type: Joi.string().optional(),
  foundationDate: Joi.date().optional(),
  registeredCountry: Joi.string().optional(),
  mainLanguage: Joi.string().optional(),
  oficialCurrency: Joi.string().optional(),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address'
  }),
  phone: Joi.string().optional(),
  logo: Joi.string().optional()
});

export const DeleteEnterpriseDto = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
});