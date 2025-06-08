import { Module } from '@nestjs/common';
import { SalesCrmService } from './sales-crm.service';
import { SalesCrmController } from './sales-crm.controller';

@Module({
  controllers: [SalesCrmController],
  providers: [SalesCrmService],
})
export class SalesCrmModule {}
