import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { FinancialManagementService } from './financial-management.service';
import { CreateInvoicesDto, UpdateInvoicesDto } from '../DTO/invoices.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Invoices } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly financialManagementService: FinancialManagementService,
  ) {}

  @Roles([Permissions.INVOICES_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getInvoices(@Query() parameters: ListParametersDto): Promise<ListResponse<Invoices>> {
    return this.financialManagementService.getInvoices(parameters);
  }

  @Roles([Permissions.INVOICES_READ])
  @Get(':id')
  getInvoice(@Param('id') id: string) {
    return this.financialManagementService.getInvoiceById(+id);
  }

  @Roles([Permissions.INVOICES_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createInvoice(@Body() dto: CreateInvoicesDto) {
    return this.financialManagementService.createInvoice(dto);
  }

  @Roles([Permissions.INVOICES_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateInvoice(@Param('id') id: string, @Body() dto: UpdateInvoicesDto) {
    return this.financialManagementService.updateInvoice(+id, dto);
  }

  @Roles([Permissions.INVOICES_DELETE])
  @Delete(':id')
  deleteInvoice(@Param('id') id: string): Promise<boolean> {
    return this.financialManagementService.deleteInvoice(+id);
  }
}