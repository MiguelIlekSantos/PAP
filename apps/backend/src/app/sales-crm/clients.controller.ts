import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { SalesCrmService } from './sales-crm.service';
import { CreateClientsDto, UpdateClientsDto } from '../DTO/clients.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Clients } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly salesCrmService: SalesCrmService,
  ) {}

  @Roles([Permissions.CLIENTS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getClients(@Query() parameters: ListParametersDto): Promise<ListResponse<Clients>> {
    return this.salesCrmService.getClients(parameters);
  }

  @Roles([Permissions.CLIENTS_READ])
  @Get(':id')
  getClient(@Param('id') id: string) {
    return this.salesCrmService.getClientById(+id);
  }

  @Roles([Permissions.CLIENTS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createClient(@Body() dto: CreateClientsDto) {
    return this.salesCrmService.createClient(dto);
  }

  @Roles([Permissions.CLIENTS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateClient(@Param('id') id: string, @Body() dto: UpdateClientsDto) {
    return this.salesCrmService.updateClient(+id, dto);
  }

  @Roles([Permissions.CLIENTS_DELETE])
  @Delete(':id')
  deleteClient(@Param('id') id: string): Promise<boolean> {
    return this.salesCrmService.deleteClient(+id);
  }
}