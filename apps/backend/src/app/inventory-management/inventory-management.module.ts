import { Module } from '@nestjs/common';
import { InventoryManagementService } from './inventory-management.service';
import { ProductsController } from './products.controller';
import { WarehousesController } from './warehouses.controller';
import { EquipmentsController } from './equipments.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [
    ProductsController,
    WarehousesController,
    EquipmentsController
  ],
  providers: [InventoryManagementService, PrismaService],
})
export class InventoryManagementModule {}
