import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { InventoryManagementService } from './inventory-management.service';
import { CreateProductsDto, UpdateProductsDto } from '../DTO/products.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Products } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly inventoryManagementService: InventoryManagementService,
  ) {}

  @Roles([Permissions.PRODUCTS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getProducts(@Query() parameters: ListParametersDto): Promise<ListResponse<Products>> {
    return this.inventoryManagementService.getProducts(parameters);
  }

  @Roles([Permissions.PRODUCTS_READ])
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.inventoryManagementService.getProductById(+id);
  }

  @Roles([Permissions.PRODUCTS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createProduct(@Body() dto: CreateProductsDto) {
    return this.inventoryManagementService.createProduct(dto);
  }

  @Roles([Permissions.PRODUCTS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductsDto) {
    return this.inventoryManagementService.updateProduct(+id, dto);
  }

  @Roles([Permissions.PRODUCTS_DELETE])
  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<boolean> {
    return this.inventoryManagementService.deleteProduct(+id);
  }
}