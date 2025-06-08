import { Module } from '@nestjs/common';
import { InventoryManagementService } from './inventory-management.service';
import { InventoryManagementController } from './inventory-management.controller';

@Module({
  controllers: [InventoryManagementController],
  providers: [InventoryManagementService],
})
export class InventoryManagementModule {}
