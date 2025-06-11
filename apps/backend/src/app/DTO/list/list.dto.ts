import Joi from 'joi';
import { JoiDtoSchema } from '@pap/utils';


@JoiDtoSchema(
  Joi.object({
    page: Joi.number().integer().min(1).default(1),
    quantity: Joi.number().integer().min(2).max(100).default(10),
    term: Joi.string().optional().allow(''),
    orderDir: Joi.string().optional().default('asc'), // TODO: enum 'asc' | 'desc'
    orderBy: Joi.string().optional().trim().default('id'), // TODO: enum 'createdAt' | 'updateAt' | 'id'
  }),
)
export class ListParametersDto {
  page?: number;
  quantity?: number;
  term?: string;
  orderDir?: "asc" | "desc";
  orderBy?: string;
}
