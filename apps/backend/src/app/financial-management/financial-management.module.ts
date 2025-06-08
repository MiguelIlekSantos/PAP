import { Module } from '@nestjs/common';
import { FinancialManagementService } from './financial-management.service';
import { FinancialManagementController } from './financial-management.controller';

@Module({
  controllers: [FinancialManagementController],
  providers: [FinancialManagementService],
})
export class FinancialManagementModule {}
