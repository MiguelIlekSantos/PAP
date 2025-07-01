// src/base/base.service.ts

import { PrismaService } from 'src/prisma.service';
import { ListResponse } from '../lib/interfaces/responses.interface';
import { Logger } from '@nestjs/common';
import { includesMap } from './includes';
import { ListParametersDto } from 'src/app/DTO/list/list.dto';

type OrderDirection = 'asc' | 'desc';

export class BaseService {
	private readonly logger = new Logger(BaseService.name);

	constructor(
		protected readonly prisma: PrismaService,
		// private readonly modelAccessor: keyof PrismaService, // Ex: 'enterprise', 'license
	) { }

	async findAll<T>(
		modelAccessor: keyof PrismaService,
		parameters?: ListParametersDto,
		searchableField = 'name'
	): Promise<ListResponse<T>> {
		const {
			page = 1,
			quantity = 10,
			term = '',
			orderDir = 'asc',
			orderBy = 'id',
			relationFilter,
		} = parameters ?? {};

		const model = this.prisma[modelAccessor] as any;

		const where: any = {};
		
		if (term) {
			where[searchableField] = {
				contains: term,
			};
		}

		if (relationFilter) {
			const [field, value] = relationFilter;
			where[field] = value;
		}

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
		const include = includesMap[modelAccessor as string];

		return model.findFirst({ 
			where: { id },
			include
		});
	}

	async create<T, INFO = Partial<T>>(modelAccessor: keyof PrismaService, data: INFO): Promise<T> {
		const model = this.prisma[modelAccessor] as any;
		
		const processedData = this.processRelationArrays(data, 'create');
		
		const created = await model.create({ data: processedData });
		return created;
	}

	async update<T, INFO = Partial<T>>(modelAccessor: keyof PrismaService, id: number, data: INFO): Promise<T> {
		const model = this.prisma[modelAccessor] as any;
		
		const processedData = this.processRelationArrays(data, 'update');
		
		const items = await model.update({
			where: {
				id: id
			},
			data: processedData
		});

		return items;
	}

	private processRelationArrays(data: any, operation: 'create' | 'update'): any {
		if (!data || typeof data !== 'object') {
			return data;
		}

		const processedData = { ...data };
		for (const [key, value] of Object.entries(processedData)) {
			if (Array.isArray(value)) {
				if (value.length === 0) {
					if (operation === 'create') {
						delete processedData[key];
					} else {
						processedData[key] = {
							set: []
						};
					}
				}
				else if (typeof value[0] === 'number') {
					if (operation === 'create') {
						processedData[key] = {
							connect: value.map(id => ({ id }))
						};
					} else {
						processedData[key] = {
							set: value.map(id => ({ id }))
						};
					}
				}
			}
		}

		return processedData;
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
