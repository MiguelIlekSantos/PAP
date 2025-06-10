import { Injectable } from '@nestjs/common';

@Injectable()
export class FinancialManagementService {
  // create(createFinancialManagementDto: CreateFinancialManagementDto) {
  //   return 'This action adds a new financialManagement';
  // }

  findAll() {
    return `This action returns all financialManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} financialManagement`;
  }

  // update(id: number, updateFinancialManagementDto: UpdateFinancialManagementDto) {
  //   return `This action updates a #${id} financialManagement`;
  // }

  remove(id: number) {
    return `This action removes a #${id} financialManagement`;
  }
}
