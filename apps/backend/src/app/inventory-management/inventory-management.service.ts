import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryManagementService {
  // create(createInventoryManagementDto: CreateInventoryManagementDto) {
  //   return 'This action adds a new inventoryManagement';
  // }

  findAll() {
    return `This action returns all inventoryManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryManagement`;
  }

  // update(id: number, updateInventoryManagementDto: UpdateInventoryManagementDto) {
  //   return `This action updates a #${id} inventoryManagement`;
  // }

  remove(id: number) {
    return `This action removes a #${id} inventoryManagement`;
  }
}
