import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { FinancialManagementService } from './financial-management.service';
import { CreateBudgetDto, UpdateBudgetDto } from '../DTO/budget.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Budget } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('budget')
export class BudgetController {
  constructor(
    private readonly financialManagementService: FinancialManagementService,
  ) {}

  @Roles([Permissions.BUDGET_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getBudgets(@Query() parameters: ListParametersDto): Promise<ListResponse<Budget>> {
    return this.financialManagementService.getBudgets(parameters);
  }

  @Roles([Permissions.BUDGET_READ])
  @Get(':id')
  getBudget(@Param('id') id: string) {
    return this.financialManagementService.getBudgetById(+id);
  }

  @Roles([Permissions.BUDGET_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createBudget(@Body() dto: CreateBudgetDto) {
    return this.financialManagementService.createBudget(dto);
  }

  @Roles([Permissions.BUDGET_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateBudget(@Param('id') id: string, @Body() dto: UpdateBudgetDto) {
    return this.financialManagementService.updateBudget(+id, dto);
  }

  @Roles([Permissions.BUDGET_DELETE])
  @Delete(':id')
  deleteBudget(@Param('id') id: string): Promise<boolean> {
    return this.financialManagementService.deleteBudget(+id);
  }
}