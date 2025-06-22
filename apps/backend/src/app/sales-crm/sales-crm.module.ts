import { Module } from '@nestjs/common';
import { SalesCrmService } from './sales-crm.service';
import { ClientsController } from './clients.controller';
import { SalesController } from './sales.controller';
import { RequestsController } from './requests.controller';
import { DeliveryController } from './delivery.controller';
import { CampaignsController } from './campaigns.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [
    ClientsController,
    SalesController,
    RequestsController,
    DeliveryController,
    CampaignsController
  ],
  providers: [SalesCrmService, PrismaService],
})
export class SalesCrmModule {}
