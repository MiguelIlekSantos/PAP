// src/base/base.service.ts

import { PrismaService } from 'src/prisma.service';
import { ListResponse } from '@pap/utils';

type OrderDirection = 'asc' | 'desc';

export class BaseService<T> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly modelAccessor: keyof PrismaService, // Ex: 'enterprise', 'license'
  ) {}

  async findAll(
    parameters?: {
      page?: number;
      quantity?: number;
      term?: string;
      orderDir?: OrderDirection;
      orderBy?: string;
    },
    searchableField = 'name' // campo padrão para buscar
  ): Promise<ListResponse<T>> {
    const {
      page = 1,
      quantity = 10,
      term = '',
      orderDir = 'asc',
      orderBy = 'id',
    } = parameters ?? {};

    const model = this.prisma[this.modelAccessor] as any;

    const where = term
      ? {
          [searchableField]: {
            contains: term,
          },
        }
      : {};

    const total = await model.count({ where });

    const results = await model.findMany({
      skip: (page - 1) * quantity,
      take: quantity,
      orderBy: {
        [orderBy]: orderDir,
      },
      where,
    });

    return {
      statusCode: 200,
      message: '',
      data: {
        items: results,
        metadata: {
          last: Math.ceil(total / quantity),
          page,
          quantity,
          total,
        },
      },
    };
  }

  async findOne(id: number): Promise<T | null> {
    const model = this.prisma[this.modelAccessor] as any;
    return model.findFirst({ where: { id } });
  }
}
