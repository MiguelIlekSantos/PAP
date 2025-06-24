import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { CreateBudgetDto, UpdateBudgetDto } from '../DTO/budget.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Budget } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('marketing-budget')
export class MarketingBudgetController {
  constructor(
    private readonly marketingService: MarketingService,
  ) {}

  @Roles([Permissions.MARKETING_BUDGET_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getMarketingBudgets(@Query() parameters: ListParametersDto): Promise<ListResponse<Budget>> {
    return this.marketingService.getMarketingBudgets(parameters);
  }

  @Roles([Permissions.MARKETING_BUDGET_READ])
  @Get(':id')
  getMarketingBudget(@Param('id') id: string) {
    return this.marketingService.getMarketingBudgetById(+id);
  }

  @Roles([Permissions.MARKETING_BUDGET_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createMarketingBudget(@Body() dto: CreateBudgetDto) {
    return this.marketingService.createMarketingBudget(dto);
  }

  @Roles([Permissions.MARKETING_BUDGET_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateMarketingBudget(@Param('id') id: string, @Body() dto: UpdateBudgetDto) {
    return this.marketingService.updateMarketingBudget(+id, dto);
  }

  @Roles([Permissions.MARKETING_BUDGET_DELETE])
  @Delete(':id')
  deleteMarketingBudget(@Param('id') id: string): Promise<boolean> {
    return this.marketingService.deleteMarketingBudget(+id);
  }
}