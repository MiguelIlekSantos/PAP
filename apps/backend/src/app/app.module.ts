import { Module } from '@nestjs/common';
import { EnterpriseManagementModule } from './enterprise-management/enterprise-management.module';
import { HumanResourcesModule } from './human-resources/human-resources.module';
import { FinancialManagementModule } from './financial-management/financial-management.module';
import { LogisticsModule } from './logistics/logistics.module';
import { MarketingModule } from './marketing/marketing.module';
import { ProjectManagementModule } from './project-management/project-management.module';
import { SalesCrmModule } from './sales-crm/sales-crm.module';
import { SystemManagementModule } from './system-management/system-management.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ReportsModule } from './reports/reports.module';
import { InventoryManagementModule } from './inventory-management/inventory-management.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard, JwtStrategy, VerifyService } from '../lib';
import { AiModuleModule } from './ai-module/ai-module.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EnterpriseManagementModule,
    HumanResourcesModule,
    FinancialManagementModule,
    LogisticsModule,
    MarketingModule,
    ProjectManagementModule,
    SalesCrmModule,
    SystemManagementModule,
    PurchasesModule,
    ReportsModule,
    InventoryManagementModule,

    PassportModule,
    JwtModule.register({}),
    AiModuleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    VerifyService,
    JwtStrategy,
    JwtGuard,
  ],
})
export class AppModule { }
