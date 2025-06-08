import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HumanResourcesService } from './human-resources.service';
import { CreateHumanResourceDto } from './dto/create-human-resource.dto';
import { UpdateHumanResourceDto } from './dto/update-human-resource.dto';

@Controller('human-resources')
export class HumanResourcesController {
  constructor(private readonly humanResourcesService: HumanResourcesService) {}

  @Post()
  create(@Body() createHumanResourceDto: CreateHumanResourceDto) {
    return this.humanResourcesService.create(createHumanResourceDto);
  }

  @Get()
  findAll() {
    return this.humanResourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.humanResourcesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHumanResourceDto: UpdateHumanResourceDto) {
    return this.humanResourcesService.update(+id, updateHumanResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.humanResourcesService.remove(+id);
  }
}
