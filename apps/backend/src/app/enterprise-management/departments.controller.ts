import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { EnterpriseManagementService } from './enterprise-management.service';
import { CreateDepartmentsDto, UpdateDepartmentsDto } from '../DTO/departments.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Departments } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(
    private readonly enterpriseManagementService: EnterpriseManagementService,
  ) {}

  @Roles([Permissions.DEPARTMENTS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getDepartments(@Query() parameters: ListParametersDto): Promise<ListResponse<Departments>> {
    return this.enterpriseManagementService.getDepartments(parameters);
  }

  @Roles([Permissions.DEPARTMENTS_READ])
  @Get(':id')
  getDepartment(@Param('id') id: string) {
    return this.enterpriseManagementService.getDepartmentById(+id);
  }

  @Roles([Permissions.DEPARTMENTS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createDepartment(@Body() dto: CreateDepartmentsDto) {
    return this.enterpriseManagementService.createDepartment(dto);
  }

  @Roles([Permissions.DEPARTMENTS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateDepartment(@Param('id') id: string, @Body() dto: UpdateDepartmentsDto) {
    return this.enterpriseManagementService.updateDepartment(+id, dto);
  }

  @Roles([Permissions.DEPARTMENTS_DELETE])
  @Delete(':id')
  deleteDepartment(@Param('id') id: string): Promise<boolean> {
    return this.enterpriseManagementService.deleteDepartment(+id);
  }
}