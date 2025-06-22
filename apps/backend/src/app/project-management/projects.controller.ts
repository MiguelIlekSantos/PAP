import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ProjectManagementService } from './project-management.service';
import { CreateProjectsDto, UpdateProjectsDto } from '../DTO/projects.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Projects } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectManagementService: ProjectManagementService,
  ) {}

  @Roles([Permissions.PROJECTS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getProjects(@Query() parameters: ListParametersDto): Promise<ListResponse<Projects>> {
    return this.projectManagementService.getProjects(parameters);
  }

  @Roles([Permissions.PROJECTS_READ])
  @Get(':id')
  getProject(@Param('id') id: string) {
    return this.projectManagementService.getProjectById(+id);
  }

  @Roles([Permissions.PROJECTS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createProject(@Body() dto: CreateProjectsDto) {
    return this.projectManagementService.createProject(dto);
  }

  @Roles([Permissions.PROJECTS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateProject(@Param('id') id: string, @Body() dto: UpdateProjectsDto) {
    return this.projectManagementService.updateProject(+id, dto);
  }

  @Roles([Permissions.PROJECTS_DELETE])
  @Delete(':id')
  deleteProject(@Param('id') id: string): Promise<boolean> {
    return this.projectManagementService.deleteProject(+id);
  }
}