import { Module } from '@nestjs/common';
import {
  EnterpriseManagementModule,
  HumanResourcesModule,
  InventoryManagementModule,
  FinancialManagementModule,
} from './modules';

@Module({
  imports: [
    EnterpriseManagementModule,
    HumanResourcesModule,
    InventoryManagementModule,
    FinancialManagementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
