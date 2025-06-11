import { Injectable } from '@nestjs/common';

import { CreateEnterpriseDto, EnterpriseDTO } from '../DTO/enterprise.dto';
import { PrismaService } from '../../prisma.service';
import { Enterprise } from '@prisma/client';
import { ListResponse } from '@pap/utils';
import { BaseService } from '../../base/base.service';

@Injectable()
export class EnterpriseManagementService extends BaseService<Enterprise> {

	constructor(prisma: PrismaService) {
		super(prisma, 'enterprise')
	}

	// async create(enterpriseInfo: CreateEnterpriseDto): Promise<boolean> {
	// 	const createEnterprise = await this.prisma.enterprise.create({
	// 		data: {
	// 			...enterpriseInfo
	// 		}
	// 	})

	// 	if (createEnterprise) {
	// 		return true
	// 	}

	// 	return false
	// }

	// async findOne(id: number): Promise<Enterprise | null> {
	// 	const enterprise = await this.prisma.enterprise.findFirst({
	// 		where: {
	// 			id,
	// 		}
	// 	})

	// 	return enterprise
	// }

	// async findAll(parameters?: ListParametersDto): Promise<ListResponse<Enterprise>> {
	// 	const {
	// 		page = 1,
	// 		quantity = 10,
	// 		term = '',
	// 		orderDir = 'asc',
	// 		orderBy = 'createdAt'
	// 	} = parameters ?? {}; 


	// 	const order: {			// creates an empty object
	// 		[key: string]: string
	// 	} = {}

	// 	if (orderBy !== undefined) {
	// 		order[orderBy] = orderDir
	// 	}

	// 	const where = {
	// 		name: {
	// 			contains: term
	// 		},
	// 	}

	// 	const total = await this.prisma.enterprise.count({
	// 		where: {
	// 			legalName: {
	// 				contains: term
	// 			}
	// 		}
	// 	})
	// 	const enterprises = await this.prisma.enterprise.findMany({
	// 		skip: (page - 1) * quantity,
	// 		take: quantity,
	// 		orderBy: order,
	// 		where: {
	// 			legalName: {
	// 				contains: term
	// 			}
	// 		}
	// 	})


	// 	return {
	// 		statusCode: 200,
	// 		message: '',
	// 		data: {
	// 			items: [],
	// 			metadata: {
	// 				last: Math.ceil(total / quantity),
	// 				page,
	// 				quantity,
	// 				total,
	// 			}
	// 		}
	// 	}
	// }



}
