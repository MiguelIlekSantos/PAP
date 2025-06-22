import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { HumanResourcesService } from './human-resources.service';
import { CreateEmployeesDto, UpdateEmployeesDto } from '../DTO/employees.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Employees } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly humanResourcesService: HumanResourcesService,
  ) {}

  @Roles([Permissions.EMPLOYEES_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getEmployees(@Query() parameters: ListParametersDto): Promise<ListResponse<Employees>> {
    return this.humanResourcesService.getEmployees(parameters);
  }

  @Roles([Permissions.EMPLOYEES_READ])
  @Get(':id')
  getEmployee(@Param('id') id: string) {
    return this.humanResourcesService.getEmployeeById(+id);
  }

  @Roles([Permissions.EMPLOYEES_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createEmployee(@Body() dto: CreateEmployeesDto) {
    return this.humanResourcesService.createEmployee(dto);
  }

  @Roles([Permissions.EMPLOYEES_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateEmployee(@Param('id') id: string, @Body() dto: UpdateEmployeesDto) {
    return this.humanResourcesService.updateEmployee(+id, dto);
  }

  @Roles([Permissions.EMPLOYEES_DELETE])
  @Delete(':id')
  deleteEmployee(@Param('id') id: string): Promise<boolean> {
    return this.humanResourcesService.deleteEmployee(+id);
  }
}