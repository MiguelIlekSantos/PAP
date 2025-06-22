import { Module } from '@nestjs/common';
import { FinancialManagementService } from './financial-management.service';
import { TransactionsController } from './transactions.controller';
import { TaxesController } from './taxes.controller';
import { BudgetController } from './budget.controller';
import { InvoicesController } from './invoices.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [
    TransactionsController,
    TaxesController,
    BudgetController,
    InvoicesController
  ],
  providers: [FinancialManagementService, PrismaService],
})
export class FinancialManagementModule {}
