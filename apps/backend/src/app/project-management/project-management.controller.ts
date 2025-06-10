import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectManagementService } from './project-management.service';

@Controller('project-management')
export class ProjectManagementController {
  constructor(private readonly projectManagementService: ProjectManagementService) {}

  // @Post()
  // create(@Body() createProjectManagementDto: CreateProjectManagementDto) {
  //   return this.projectManagementService.create(createProjectManagementDto);
  // }

  @Get()
  findAll() {
    return this.projectManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectManagementService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProjectManagementDto: UpdateProjectManagementDto) {
  //   return this.projectManagementService.update(+id, updateProjectManagementDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectManagementService.remove(+id);
  }
}
