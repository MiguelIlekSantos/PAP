import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { HumanResourcesService } from './human-resources.service';
import { CreateTasksDto, UpdateTasksDto } from '../DTO/tasks.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Tasks } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly humanResourcesService: HumanResourcesService,
  ) {}

  @Roles([Permissions.TASKS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getTasks(@Query() parameters: ListParametersDto): Promise<ListResponse<Tasks>> {
    return this.humanResourcesService.getTasks(parameters);
  }

  @Roles([Permissions.TASKS_READ])
  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.humanResourcesService.getTaskById(+id);
  }

  @Roles([Permissions.TASKS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createTask(@Body() dto: CreateTasksDto) {
    return this.humanResourcesService.createTask(dto);
  }

  @Roles([Permissions.TASKS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateTask(@Param('id') id: string, @Body() dto: UpdateTasksDto) {
    return this.humanResourcesService.updateTask(+id, dto);
  }

  @Roles([Permissions.TASKS_DELETE])
  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<boolean> {
    return this.humanResourcesService.deleteTask(+id);
  }
}