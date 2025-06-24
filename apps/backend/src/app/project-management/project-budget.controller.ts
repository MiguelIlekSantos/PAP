import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ProjectManagementService } from './project-management.service';
import { CreateBudgetDto, UpdateBudgetDto } from '../DTO/budget.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Budget } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('project-budget')
export class ProjectBudgetController {
  constructor(
    private readonly projectManagementService: ProjectManagementService,
  ) {}

  @Roles([Permissions.PROJECT_BUDGET_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getProjectBudgets(@Query() parameters: ListParametersDto): Promise<ListResponse<Budget>> {
    return this.projectManagementService.getProjectBudgets(parameters);
  }

  @Roles([Permissions.PROJECT_BUDGET_READ])
  @Get(':id')
  getProjectBudget(@Param('id') id: string) {
    return this.projectManagementService.getProjectBudgetById(+id);
  }

  @Roles([Permissions.PROJECT_BUDGET_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createProjectBudget(@Body() dto: CreateBudgetDto) {
    return this.projectManagementService.createProjectBudget(dto);
  }

  @Roles([Permissions.PROJECT_BUDGET_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateProjectBudget(@Param('id') id: string, @Body() dto: UpdateBudgetDto) {
    return this.projectManagementService.updateProjectBudget(+id, dto);
  }

  @Roles([Permissions.PROJECT_BUDGET_DELETE])
  @Delete(':id')
  deleteProjectBudget(@Param('id') id: string): Promise<boolean> {
    return this.projectManagementService.deleteProjectBudget(+id);
  }
}