import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreateSuppliersDto, UpdateSuppliersDto } from '../DTO/suppliers.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Suppliers } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly purchasesService: PurchasesService,
  ) {}

  @Roles([Permissions.SUPPLIERS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getSuppliers(@Query() parameters: ListParametersDto): Promise<ListResponse<Suppliers>> {
    return this.purchasesService.getSuppliers(parameters);
  }

  @Roles([Permissions.SUPPLIERS_READ])
  @Get(':id')
  getSupplier(@Param('id') id: string) {
    return this.purchasesService.getSupplierById(+id);
  }

  @Roles([Permissions.SUPPLIERS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createSupplier(@Body() dto: CreateSuppliersDto) {
    return this.purchasesService.createSupplier(dto);
  }

  @Roles([Permissions.SUPPLIERS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateSupplier(@Param('id') id: string, @Body() dto: UpdateSuppliersDto) {
    return this.purchasesService.updateSupplier(+id, dto);
  }

  @Roles([Permissions.SUPPLIERS_DELETE])
  @Delete(':id')
  deleteSupplier(@Param('id') id: string): Promise<boolean> {
    return this.purchasesService.deleteSupplier(+id);
  }
}