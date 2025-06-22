import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesOrdersController } from './purchases-orders.controller';
import { SuppliersController } from './suppliers.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [
    PurchasesOrdersController,
    SuppliersController
  ],
  providers: [PurchasesService, PrismaService],
})
export class PurchasesModule {}
