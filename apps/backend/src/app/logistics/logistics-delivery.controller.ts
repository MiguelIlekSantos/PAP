import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { LogisticsService } from './logistics.service';
import { CreateDeliveryDto, UpdateDeliveryDto } from '../DTO/delivery.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Delivery } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('logistics-delivery')
export class LogisticsDeliveryController {
  constructor(
    private readonly logisticsService: LogisticsService,
  ) {}

  @Roles([Permissions.LOGISTICS_DELIVERY_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getLogisticsDeliveries(@Query() parameters: ListParametersDto): Promise<ListResponse<Delivery>> {
    return this.logisticsService.getLogisticsDeliveries(parameters);
  }

  @Roles([Permissions.LOGISTICS_DELIVERY_READ])
  @Get(':id')
  getLogisticsDelivery(@Param('id') id: string) {
    return this.logisticsService.getLogisticsDeliveryById(+id);
  }

  @Roles([Permissions.LOGISTICS_DELIVERY_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createLogisticsDelivery(@Body() dto: CreateDeliveryDto) {
    return this.logisticsService.createLogisticsDelivery(dto);
  }

  @Roles([Permissions.LOGISTICS_DELIVERY_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateLogisticsDelivery(@Param('id') id: string, @Body() dto: UpdateDeliveryDto) {
    return this.logisticsService.updateLogisticsDelivery(+id, dto);
  }

  @Roles([Permissions.LOGISTICS_DELIVERY_DELETE])
  @Delete(':id')
  deleteLogisticsDelivery(@Param('id') id: string): Promise<boolean> {
    return this.logisticsService.deleteLogisticsDelivery(+id);
  }
}