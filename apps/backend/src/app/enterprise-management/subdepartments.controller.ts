import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { EnterpriseManagementService } from './enterprise-management.service';
import { CreateSubDepartmentsDto, UpdateSubDepartmentsDto } from '../DTO/subdepartments.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { SubDepartments } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('subdepartments')
export class SubDepartmentsController {
  constructor(
    private readonly enterpriseManagementService: EnterpriseManagementService,
  ) {}

  @Roles([Permissions.SUBDEPARTMENTS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getSubDepartments(@Query() parameters: ListParametersDto): Promise<ListResponse<SubDepartments>> {
    return this.enterpriseManagementService.getSubDepartments(parameters);
  }

  @Roles([Permissions.SUBDEPARTMENTS_READ])
  @Get(':id')
  getSubDepartment(@Param('id') id: string) {
    return this.enterpriseManagementService.getSubDepartmentById(+id);
  }

  @Roles([Permissions.SUBDEPARTMENTS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createSubDepartment(@Body() dto: CreateSubDepartmentsDto) {
    return this.enterpriseManagementService.createSubDepartment(dto);
  }

  @Roles([Permissions.SUBDEPARTMENTS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateSubDepartment(@Param('id') id: string, @Body() dto: UpdateSubDepartmentsDto) {
    return this.enterpriseManagementService.updateSubDepartment(+id, dto);
  }

  @Roles([Permissions.SUBDEPARTMENTS_DELETE])
  @Delete(':id')
  deleteSubDepartment(@Param('id') id: string): Promise<boolean> {
    return this.enterpriseManagementService.deleteSubDepartment(+id);
  }
}