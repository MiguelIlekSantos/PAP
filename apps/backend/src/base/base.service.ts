// src/base/base.service.ts

import { PrismaService } from 'src/prisma.service';
import { ListResponse } from '../lib/interfaces/responses.interface';

type OrderDirection = 'asc' | 'desc';

export class BaseService<T> {
	constructor(
		protected readonly prisma: PrismaService,
		private readonly modelAccessor: keyof PrismaService, // Ex: 'enterprise', 'license'
	) { }

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

	async create<INFO = Partial<T>>(data: INFO): Promise<T> {
		const model = this.prisma[this.modelAccessor] as any;
		const created = await model.create({ data });
		return created;
	}

	async update<INFO = Partial<T>>(id: number, data: INFO): Promise<T> {
		const model = this.prisma[this.modelAccessor] as any;
		const items = await model.update({
			where: {
				id: id
			},
			data: data
		});

		return items;
	}

	async delete(id: number): Promise<boolean> {
		const model = this.prisma[this.modelAccessor] as any;
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

