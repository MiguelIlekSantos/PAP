import { Module } from '@nestjs/common';
import { LogisticsService } from './logistics.service';
import { LogisticsDeliveryController } from './logistics-delivery.controller';
import { TransportersController } from './transporters.controller';
import { LogisticsProductsController } from './logistics-products.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [
    LogisticsDeliveryController,
    TransportersController,
    LogisticsProductsController
  ],
  providers: [LogisticsService, PrismaService],
})
export class LogisticsModule {}
