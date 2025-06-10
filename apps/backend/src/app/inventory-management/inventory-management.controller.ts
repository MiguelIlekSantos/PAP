import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryManagementService } from './inventory-management.service';

@Controller('inventory-management')
export class InventoryManagementController {
  constructor(private readonly inventoryManagementService: InventoryManagementService) {}

  // @Post()
  // create(@Body() createInventoryManagementDto: CreateInventoryManagementDto) {
  //   return this.inventoryManagementService.create(createInventoryManagementDto);
  // }

  @Get()
  findAll() {
    return this.inventoryManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryManagementService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInventoryManagementDto: UpdateInventoryManagementDto) {
  //   return this.inventoryManagementService.update(+id, updateInventoryManagementDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryManagementService.remove(+id);
  }
}
