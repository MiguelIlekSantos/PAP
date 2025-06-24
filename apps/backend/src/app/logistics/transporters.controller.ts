import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { LogisticsService } from './logistics.service';
import { CreateTransportersDto, UpdateTransportersDto } from '../DTO/transporters.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Transporters } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('transporters')
export class TransportersController {
  constructor(
    private readonly logisticsService: LogisticsService,
  ) {}

  @Roles([Permissions.TRANSPORTERS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getTransporters(@Query() parameters: ListParametersDto): Promise<ListResponse<Transporters>> {
    return this.logisticsService.getTransporters(parameters);
  }

  @Roles([Permissions.TRANSPORTERS_READ])
  @Get(':id')
  getTransporter(@Param('id') id: string) {
    return this.logisticsService.getTransporterById(+id);
  }

  @Roles([Permissions.TRANSPORTERS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createTransporter(@Body() dto: CreateTransportersDto) {
    return this.logisticsService.createTransporter(dto);
  }

  @Roles([Permissions.TRANSPORTERS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateTransporter(@Param('id') id: string, @Body() dto: UpdateTransportersDto) {
    return this.logisticsService.updateTransporter(+id, dto);
  }

  @Roles([Permissions.TRANSPORTERS_DELETE])
  @Delete(':id')
  deleteTransporter(@Param('id') id: string): Promise<boolean> {
    return this.logisticsService.deleteTransporter(+id);
  }
}