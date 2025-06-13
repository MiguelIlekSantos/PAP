import { Injectable } from '@nestjs/common';

import { CreateEnterpriseDto, EnterpriseDTO, UpdateEnterpriseDto } from '../DTO/enterprise.dto';
import { PrismaService } from '../../prisma.service';
import { Enterprise } from '@prisma/client';
import { BaseService } from '../../base/base.service';

@Injectable()
export class EnterpriseManagementService extends BaseService<Enterprise> {

	constructor(prisma: PrismaService) {
		super(prisma, 'enterprise')
	}

	async createEnterprise(enterpriseInfo: CreateEnterpriseDto){
		return this.create<CreateEnterpriseDto>(enterpriseInfo)
	}

	async updateEnterprise(id: number, enterpriseInfo: UpdateEnterpriseDto){
		return this.update<UpdateEnterpriseDto>(id, enterpriseInfo)
	}

	async deleteEnterprise(id: number){
		return this.delete(id)
	}

}
