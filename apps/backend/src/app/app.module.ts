import { Module } from '@nestjs/common';
import { EnterpriseManagementModule } from './enterprise-management/enterprise-management.module';
import { HumanResourcesModule } from './human-resources/human-resources.module';
import { InventoryManagementModule } from './inventory-management/inventory-management.module';
import { FinancialManagementModule } from './financial-management/financial-management.module';
import { LogisticsModule } from './logistics/logistics.module';
import { MarketingModule } from './marketing/marketing.module';
import { ProjectManagementModule } from './project-management/project-management.module';
import { SalesCrmModule } from './sales-crm/sales-crm.module';
import { SystemManagementModule } from './system-management/system-management.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ReportsModule } from './reports/reports.module';


@Module({
  imports: [
    EnterpriseManagementModule,
    HumanResourcesModule,
    InventoryManagementModule,
    FinancialManagementModule,
    LogisticsModule,
    MarketingModule,
    ProjectManagementModule,
    SalesCrmModule,
    SystemManagementModule,
    PurchasesModule,
    ReportsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
