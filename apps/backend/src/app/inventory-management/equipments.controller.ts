import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { InventoryManagementService } from './inventory-management.service';
import { CreateEquipmentsDto, UpdateEquipmentsDto } from '../DTO/equipments.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Equipments } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('equipments')
export class EquipmentsController {
  constructor(
    private readonly inventoryManagementService: InventoryManagementService,
  ) {}

  @Roles([Permissions.EQUIPMENTS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getEquipments(@Query() parameters: ListParametersDto): Promise<ListResponse<Equipments>> {
    return this.inventoryManagementService.getEquipments(parameters);
  }

  @Roles([Permissions.EQUIPMENTS_READ])
  @Get(':id')
  getEquipment(@Param('id') id: string) {
    return this.inventoryManagementService.getEquipmentById(+id);
  }

  @Roles([Permissions.EQUIPMENTS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createEquipment(@Body() dto: CreateEquipmentsDto) {
    return this.inventoryManagementService.createEquipment(dto);
  }

  @Roles([Permissions.EQUIPMENTS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateEquipment(@Param('id') id: string, @Body() dto: UpdateEquipmentsDto) {
    return this.inventoryManagementService.updateEquipment(+id, dto);
  }

  @Roles([Permissions.EQUIPMENTS_DELETE])
  @Delete(':id')
  deleteEquipment(@Param('id') id: string): Promise<boolean> {
    return this.inventoryManagementService.deleteEquipment(+id);
  }
}