import { Injectable } from '@nestjs/common';
import { CreateEnterpriseManagementDto } from './dto/create-enterprise-management.dto';
import { UpdateEnterpriseManagementDto } from './dto/update-enterprise-management.dto';

@Injectable()
export class EnterpriseManagementService {
  create(createEnterpriseManagementDto: CreateEnterpriseManagementDto) {
    return 'This action adds a new enterpriseManagement';
  }

  findAll() {
    return `This action returns all enterpriseManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enterpriseManagement`;
  }

  update(id: number, updateEnterpriseManagementDto: UpdateEnterpriseManagementDto) {
    return `This action updates a #${id} enterpriseManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} enterpriseManagement`;
  }
}
