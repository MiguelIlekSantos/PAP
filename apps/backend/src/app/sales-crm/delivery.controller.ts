import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { SalesCrmService } from './sales-crm.service';
import { CreateDeliveryDto, UpdateDeliveryDto } from '../DTO/delivery.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Delivery } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('delivery')
export class DeliveryController {
  constructor(
    private readonly salesCrmService: SalesCrmService,
  ) {}

  @Roles([Permissions.DELIVERY_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getDeliveries(@Query() parameters: ListParametersDto): Promise<ListResponse<Delivery>> {
    return this.salesCrmService.getDeliveries(parameters);
  }

  @Roles([Permissions.DELIVERY_READ])
  @Get(':id')
  getDelivery(@Param('id') id: string) {
    return this.salesCrmService.getDeliveryById(+id);
  }

  @Roles([Permissions.DELIVERY_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createDelivery(@Body() dto: CreateDeliveryDto) {
    return this.salesCrmService.createDelivery(dto);
  }

  @Roles([Permissions.DELIVERY_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateDelivery(@Param('id') id: string, @Body() dto: UpdateDeliveryDto) {
    return this.salesCrmService.updateDelivery(+id, dto);
  }

  @Roles([Permissions.DELIVERY_DELETE])
  @Delete(':id')
  deleteDelivery(@Param('id') id: string): Promise<boolean> {
    return this.salesCrmService.deleteDelivery(+id);
  }
}