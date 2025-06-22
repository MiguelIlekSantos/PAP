import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { FinancialManagementService } from './financial-management.service';
import { CreateTransactionsDto, UpdateTransactionsDto } from '../DTO/transactions.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Transactions } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly financialManagementService: FinancialManagementService,
  ) {}

  @Roles([Permissions.TRANSACTIONS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getTransactions(@Query() parameters: ListParametersDto): Promise<ListResponse<Transactions>> {
    return this.financialManagementService.getTransactions(parameters);
  }

  @Roles([Permissions.TRANSACTIONS_READ])
  @Get(':id')
  getTransaction(@Param('id') id: string) {
    return this.financialManagementService.getTransactionById(+id);
  }

  @Roles([Permissions.TRANSACTIONS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createTransaction(@Body() dto: CreateTransactionsDto) {
    return this.financialManagementService.createTransaction(dto);
  }

  @Roles([Permissions.TRANSACTIONS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateTransaction(@Param('id') id: string, @Body() dto: UpdateTransactionsDto) {
    return this.financialManagementService.updateTransaction(+id, dto);
  }

  @Roles([Permissions.TRANSACTIONS_DELETE])
  @Delete(':id')
  deleteTransaction(@Param('id') id: string): Promise<boolean> {
    return this.financialManagementService.deleteTransaction(+id);
  }
}