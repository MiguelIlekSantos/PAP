import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { SalesCrmService } from './sales-crm.service';
import { CreateSalesDto, UpdateSalesDto } from '../DTO/sales.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Sales } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesCrmService: SalesCrmService,
  ) {}

  @Roles([Permissions.SALES_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getSales(@Query() parameters: ListParametersDto): Promise<ListResponse<Sales>> {
    return this.salesCrmService.getSales(parameters);
  }

  @Roles([Permissions.SALES_READ])
  @Get(':id')
  getSale(@Param('id') id: string) {
    return this.salesCrmService.getSaleById(+id);
  }

  @Roles([Permissions.SALES_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createSale(@Body() dto: CreateSalesDto) {
    return this.salesCrmService.createSale(dto);
  }

  @Roles([Permissions.SALES_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateSale(@Param('id') id: string, @Body() dto: UpdateSalesDto) {
    return this.salesCrmService.updateSale(+id, dto);
  }

  @Roles([Permissions.SALES_DELETE])
  @Delete(':id')
  deleteSale(@Param('id') id: string): Promise<boolean> {
    return this.salesCrmService.deleteSale(+id);
  }
}