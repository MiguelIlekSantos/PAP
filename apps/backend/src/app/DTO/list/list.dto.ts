import Joi from 'joi';
import { JoiDtoSchema } from '../../../lib';


@JoiDtoSchema(
  Joi.object({
    page: Joi.number().integer().min(1).default(1),
    quantity: Joi.number().integer().min(2).max(100).default(10),
    term: Joi.string().optional().allow(''),
    orderDir: Joi.string().optional().default('asc'), // TODO: enum 'asc' | 'desc'
    orderBy: Joi.string().optional().trim().default('id'), // TODO: enum 'createdAt' | 'updateAt' | 'id'
    relationFilter: Joi.array().items(
      Joi.string().required(),
      Joi.alternatives().try(Joi.number(), Joi.string()).required()
    ).length(2).optional(),
  }),
)
export class ListParametersDto {
  page?: number;
  quantity?: number;
  term?: string;
  orderDir?: "asc" | "desc";
  orderBy?: string;
  relationFilter?: [string, number | string];
}
