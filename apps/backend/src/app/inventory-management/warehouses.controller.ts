import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { InventoryManagementService } from './inventory-management.service';
import { CreateWarehousesDto, UpdateWarehousesDto } from '../DTO/warehouses.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { WareHouses } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('warehouses')
export class WarehousesController {
  constructor(
    private readonly inventoryManagementService: InventoryManagementService,
  ) {}

  @Roles([Permissions.WAREHOUSES_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getWarehouses(@Query() parameters: ListParametersDto): Promise<ListResponse<WareHouses>> {
    return this.inventoryManagementService.getWarehouses(parameters);
  }

  @Roles([Permissions.WAREHOUSES_READ])
  @Get(':id')
  getWarehouse(@Param('id') id: string) {
    return this.inventoryManagementService.getWarehouseById(+id);
  }

  @Roles([Permissions.WAREHOUSES_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createWarehouse(@Body() dto: CreateWarehousesDto) {
    return this.inventoryManagementService.createWarehouse(dto);
  }

  @Roles([Permissions.WAREHOUSES_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateWarehouse(@Param('id') id: string, @Body() dto: UpdateWarehousesDto) {
    return this.inventoryManagementService.updateWarehouse(+id, dto);
  }

  @Roles([Permissions.WAREHOUSES_DELETE])
  @Delete(':id')
  deleteWarehouse(@Param('id') id: string): Promise<boolean> {
    return this.inventoryManagementService.deleteWarehouse(+id);
  }
}