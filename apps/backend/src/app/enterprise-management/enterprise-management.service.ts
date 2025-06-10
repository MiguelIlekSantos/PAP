import { Injectable } from '@nestjs/common';

import { CreateEnterpriseDto } from '../DTO/enterprise.dto';

@Injectable()
export class EnterpriseManagementService {
  create(createEnterpriseManagementDto: CreateEnterpriseDto) {
    return 'This action adds a new enterpriseManagement';
  }

  findAll() {
    return `returning something`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enterpriseManagement`;
  }

  // update(id: number, updateEnterpriseManagementDto: UpdateEnterpriseManagementDto) {
  //   return `This action updates a #${id} enterpriseManagement`;
  // }

  remove(id: number) {
    return `This action removes a #${id} enterpriseManagement`;
  }
}
