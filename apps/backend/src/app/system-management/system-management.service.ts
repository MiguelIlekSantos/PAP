import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemManagementService {
  // create(createSystemManagementDto: CreateSystemManagementDto) {
  //   return 'This action adds a new systemManagement';
  // }

  findAll() {
    return `This action returns all systemManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemManagement`;
  }

  // update(id: number, updateSystemManagementDto: UpdateSystemManagementDto) {
  //   return `This action updates a #${id} systemManagement`;
  // }

  remove(id: number) {
    return `This action removes a #${id} systemManagement`;
  }
}
