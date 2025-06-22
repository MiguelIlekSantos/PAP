import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { FinancialManagementService } from './financial-management.service';
import { CreateTaxesDto, UpdateTaxesDto } from '../DTO/taxes.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Taxes } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('taxes')
export class TaxesController {
  constructor(
    private readonly financialManagementService: FinancialManagementService,
  ) {}

  @Roles([Permissions.TAXES_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getTaxes(@Query() parameters: ListParametersDto): Promise<ListResponse<Taxes>> {
    return this.financialManagementService.getTaxes(parameters);
  }

  @Roles([Permissions.TAXES_READ])
  @Get(':id')
  getTax(@Param('id') id: string) {
    return this.financialManagementService.getTaxById(+id);
  }

  @Roles([Permissions.TAXES_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createTax(@Body() dto: CreateTaxesDto) {
    return this.financialManagementService.createTax(dto);
  }

  @Roles([Permissions.TAXES_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateTax(@Param('id') id: string, @Body() dto: UpdateTaxesDto) {
    return this.financialManagementService.updateTax(+id, dto);
  }

  @Roles([Permissions.TAXES_DELETE])
  @Delete(':id')
  deleteTax(@Param('id') id: string): Promise<boolean> {
    return this.financialManagementService.deleteTax(+id);
  }
}