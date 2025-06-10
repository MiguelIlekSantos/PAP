import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemManagementService } from './system-management.service';

@Controller('system-management')
export class SystemManagementController {
  constructor(private readonly systemManagementService: SystemManagementService) {}

  // @Post()
  // create(@Body() createSystemManagementDto: CreateSystemManagementDto) {
  //   return this.systemManagementService.create(createSystemManagementDto);
  // }

  @Get()
  findAll() {
    return this.systemManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemManagementService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSystemManagementDto: UpdateSystemManagementDto) {
  //   return this.systemManagementService.update(+id, updateSystemManagementDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemManagementService.remove(+id);
  }
}
