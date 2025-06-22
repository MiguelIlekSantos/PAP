import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ProjectManagementService } from './project-management.service';
import { CreateTasksDto, UpdateTasksDto } from '../DTO/tasks.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Tasks } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('project-tasks')
export class ProjectTasksController {
  constructor(
    private readonly projectManagementService: ProjectManagementService,
  ) {}

  @Roles([Permissions.PROJECT_TASKS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getProjectTasks(@Query() parameters: ListParametersDto): Promise<ListResponse<Tasks>> {
    return this.projectManagementService.getProjectTasks(parameters);
  }

  @Roles([Permissions.PROJECT_TASKS_READ])
  @Get(':id')
  getProjectTask(@Param('id') id: string) {
    return this.projectManagementService.getProjectTaskById(+id);
  }

  @Roles([Permissions.PROJECT_TASKS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createProjectTask(@Body() dto: CreateTasksDto) {
    return this.projectManagementService.createProjectTask(dto);
  }

  @Roles([Permissions.PROJECT_TASKS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateProjectTask(@Param('id') id: string, @Body() dto: UpdateTasksDto) {
    return this.projectManagementService.updateProjectTask(+id, dto);
  }

  @Roles([Permissions.PROJECT_TASKS_DELETE])
  @Delete(':id')
  deleteProjectTask(@Param('id') id: string): Promise<boolean> {
    return this.projectManagementService.deleteProjectTask(+id);
  }
}