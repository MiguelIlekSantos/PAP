import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { LogisticsService } from './logistics.service';
import { CreateProductsDto, UpdateProductsDto } from '../DTO/products.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Products } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('logistics-products')
export class LogisticsProductsController {
  constructor(
    private readonly logisticsService: LogisticsService,
  ) {}

  @Roles([Permissions.LOGISTICS_PRODUCTS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getLogisticsProducts(@Query() parameters: ListParametersDto): Promise<ListResponse<Products>> {
    return this.logisticsService.getLogisticsProducts(parameters);
  }

  @Roles([Permissions.LOGISTICS_PRODUCTS_READ])
  @Get(':id')
  getLogisticsProduct(@Param('id') id: string) {
    return this.logisticsService.getLogisticsProductById(+id);
  }

  @Roles([Permissions.LOGISTICS_PRODUCTS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createLogisticsProduct(@Body() dto: CreateProductsDto) {
    return this.logisticsService.createLogisticsProduct(dto);
  }

  @Roles([Permissions.LOGISTICS_PRODUCTS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateLogisticsProduct(@Param('id') id: string, @Body() dto: UpdateProductsDto) {
    return this.logisticsService.updateLogisticsProduct(+id, dto);
  }

  @Roles([Permissions.LOGISTICS_PRODUCTS_DELETE])
  @Delete(':id')
  deleteLogisticsProduct(@Param('id') id: string): Promise<boolean> {
    return this.logisticsService.deleteLogisticsProduct(+id);
  }
}