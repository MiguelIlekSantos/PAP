import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogisticsService } from './logistics.service';

@Controller('logistics')
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}

  // @Post()
  // create(@Body() createLogisticDto: CreateLogisticDto) {
  //   return this.logisticsService.create(createLogisticDto);
  // }

  @Get()
  findAll() {
    return this.logisticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logisticsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLogisticDto: UpdateLogisticDto) {
  //   return this.logisticsService.update(+id, updateLogisticDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logisticsService.remove(+id);
  }
}
