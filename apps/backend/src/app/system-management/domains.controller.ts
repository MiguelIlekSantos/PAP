import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { SystemManagementService } from './system-management.service';
import { CreateDomainsDto, UpdateDomainsDto } from '../DTO/domains.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Domains } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('domains')
export class DomainsController {
  constructor(
    private readonly systemManagementService: SystemManagementService,
  ) {}

  @Roles([Permissions.DOMAINS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getDomains(@Query() parameters: ListParametersDto): Promise<ListResponse<Domains>> {
    return this.systemManagementService.getDomains(parameters);
  }

  @Roles([Permissions.DOMAINS_READ])
  @Get(':id')
  getDomain(@Param('id') id: string) {
    return this.systemManagementService.getDomainById(+id);
  }

  @Roles([Permissions.DOMAINS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createDomain(@Body() dto: CreateDomainsDto) {
    return this.systemManagementService.createDomain(dto);
  }

  @Roles([Permissions.DOMAINS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateDomain(@Param('id') id: string, @Body() dto: UpdateDomainsDto) {
    return this.systemManagementService.updateDomain(+id, dto);
  }

  @Roles([Permissions.DOMAINS_DELETE])
  @Delete(':id')
  deleteDomain(@Param('id') id: string): Promise<boolean> {
    return this.systemManagementService.deleteDomain(+id);
  }
}