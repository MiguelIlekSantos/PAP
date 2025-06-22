import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { SalesCrmService } from './sales-crm.service';
import { CreateRequestsDto, UpdateRequestsDto } from '../DTO/requests.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Requests } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('requests')
export class RequestsController {
  constructor(
    private readonly salesCrmService: SalesCrmService,
  ) {}

  @Roles([Permissions.REQUESTS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getRequests(@Query() parameters: ListParametersDto): Promise<ListResponse<Requests>> {
    return this.salesCrmService.getRequests(parameters);
  }

  @Roles([Permissions.REQUESTS_READ])
  @Get(':id')
  getRequest(@Param('id') id: string) {
    return this.salesCrmService.getRequestById(+id);
  }

  @Roles([Permissions.REQUESTS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createRequest(@Body() dto: CreateRequestsDto) {
    return this.salesCrmService.createRequest(dto);
  }

  @Roles([Permissions.REQUESTS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateRequest(@Param('id') id: string, @Body() dto: UpdateRequestsDto) {
    return this.salesCrmService.updateRequest(+id, dto);
  }

  @Roles([Permissions.REQUESTS_DELETE])
  @Delete(':id')
  deleteRequest(@Param('id') id: string): Promise<boolean> {
    return this.salesCrmService.deleteRequest(+id);
  }
}