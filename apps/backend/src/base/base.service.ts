// src/base/base.service.ts

import { PrismaService } from 'src/prisma.service';
import { ListResponse } from '../lib/interfaces/responses.interface';
import { Logger } from '@nestjs/common';

type OrderDirection = 'asc' | 'desc';

type parameters = {
	page ?: number;
	quantity ?: number;
	term ?: string;
	orderDir ?: OrderDirection;
	orderBy ?: string;
}

export class BaseService {
	private readonly logger = new Logger(BaseService.name);

	constructor(
		protected readonly prisma: PrismaService,
		// private readonly modelAccessor: keyof PrismaService, // Ex: 'enterprise', 'license
	) { }

	async findAll<T>(
		modelAccessor: keyof PrismaService,
		parameters?: parameters,
		searchableField = 'name'
	): Promise<ListResponse<T>> {
		console.log(parameters)
		console.log(searchableField)
		console.log(typeof(modelAccessor))
		

		const {
			page = 1,
			quantity = 10,
			term = '',
			orderDir = 'asc',
			orderBy = 'id',
		} = parameters ?? {};

		const model = this.prisma[modelAccessor] as any;

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

	async findOne<T>(modelAccessor: keyof PrismaService, id: number): Promise<T | null> {
		const model = this.prisma[modelAccessor] as any;
		return model.findFirst({ where: { id } });
	}

	async create<T, INFO = Partial<T>>(modelAccessor: keyof PrismaService, data: INFO): Promise<T> {
		const model = this.prisma[modelAccessor] as any;
		const created = await model.create({ data });
		return created;
	}

	async update<T, INFO = Partial<T>>(modelAccessor: keyof PrismaService, id: number, data: INFO): Promise<T> {
		const model = this.prisma[modelAccessor] as any;
		const items = await model.update({
			where: {
				id: id
			},
			data: data
		});

		return items;
	}

	async delete<T>(modelAccessor: keyof PrismaService, id: number): Promise<boolean> {
		const model = this.prisma[modelAccessor] as any;
		const items = await model.delete({
			where: {
				id: id
			}
		});

		if (items) {
			return true
		}

		return false;
	}


}

