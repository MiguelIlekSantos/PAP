import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { EnterpriseManagementService } from './enterprise-management.service';
import { CreateEnterpriseDto, UpdateEnterpriseDto } from '../DTO/enterprise.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Enterprise } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('enterprises')
export class EnterprisesController {
  constructor(
    private readonly enterpriseManagementService: EnterpriseManagementService,
  ) {}

  @Roles([Permissions.ENTERPRISE_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  findAll(@Query() parameters: ListParametersDto): Promise<ListResponse<Enterprise>> {
    return this.enterpriseManagementService.getEnterprises(parameters);
  }

  @Roles([Permissions.ENTERPRISE_READ])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enterpriseManagementService.getEnterpriseById(+id);
  }

  @Roles([Permissions.ENTERPRISE_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseManagementService.createEnterprise(createEnterpriseDto);
  }

  @Roles([Permissions.ENTERPRISE_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  update(@Param('id') id: string, @Body() updateEnterpriseDto: UpdateEnterpriseDto) {
    return this.enterpriseManagementService.updateEnterprise(+id, updateEnterpriseDto);
  }

  @Roles([Permissions.ENTERPRISE_DELETE])
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.enterpriseManagementService.deleteEnterprise(+id);
  }
}