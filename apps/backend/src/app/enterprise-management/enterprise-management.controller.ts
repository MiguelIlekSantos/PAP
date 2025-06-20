import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes,} from '@nestjs/common';
import { EnterpriseManagementService } from './enterprise-management.service';
import { CreateEnterpriseDto, UpdateEnterpriseDto,} from '../DTO/enterprise.dto';
import { CreateBranchesDto, UpdateBranchesDto,} from '../DTO/branches.dto';
import { CreateDepartmentsDto, UpdateDepartmentsDto,} from '../DTO/departments.dto';
import { CreateSubDepartmentsDto, UpdateSubDepartmentsDto,} from '../DTO/subdepartments.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Enterprise, Branches, Departments, SubDepartments } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('enterprises')
export class EnterpriseManagementController {
  constructor(
    private readonly enterpriseManagementService: EnterpriseManagementService,
  ) {}

  // --------------------- ENTERPRISE ---------------------

  @Roles([Permissions.ENTERPRISE_READ])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enterpriseManagementService.getEnterpriseById(+id);
  }

  @Roles([Permissions.ENTERPRISE_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  findAll(@Query() parameters: ListParametersDto): Promise<ListResponse<Enterprise>> {
    return this.enterpriseManagementService.getEnterprises(parameters);
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


  // --------------------- BRANCHES ---------------------

  @Roles([Permissions.BRANCHES_READ])
  @Get('branches')
  @UsePipes(new JoiValidationPipe)
  getBranches(@Query() parameters: ListParametersDto): Promise<ListResponse<Branches>> {
    console.log("Roles permited")
    return this.enterpriseManagementService.getBranches(parameters);
  }

  @Roles([Permissions.BRANCHES_READ])
  @Get('branches/:id')
  getBranch(@Param('id') id: string) {
    return this.enterpriseManagementService.getBranchById(+id);
  }

  @Roles([Permissions.BRANCHES_CREATE])
  @Post('branches')
  @UsePipes(new JoiValidationPipe)
  createBranch(@Body() dto: CreateBranchesDto) {
    return this.enterpriseManagementService.createBranch(dto);
  }

  @Roles([Permissions.BRANCHES_UPDATE])
  @Put('branches/:id')
  @Patch('branches/:id')
  @UsePipes(new JoiValidationPipe)
  updateBranch(@Param('id') id: string, @Body() dto: UpdateBranchesDto) {
    return this.enterpriseManagementService.updateBranch(+id, dto);
  }

  @Roles([Permissions.BRANCHES_DELETE])
  @Delete('branches/:id')
  deleteBranch(@Param('id') id: string): Promise<boolean> {
    return this.enterpriseManagementService.deleteBranch(+id);
  }


  // --------------------- DEPARTMENTS ---------------------

  @Roles([Permissions.DEPARTMENTS_READ])
  @Get('departments')
  @UsePipes(new JoiValidationPipe)
  getDepartments(@Query() parameters: ListParametersDto): Promise<ListResponse<Departments>> {
    return this.enterpriseManagementService.getDepartments(parameters);
  }

  @Roles([Permissions.DEPARTMENTS_READ])
  @Get('departments/:id')
  getDepartment(@Param('id') id: string) {
    return this.enterpriseManagementService.getDepartmentById(+id);
  }

  @Roles([Permissions.DEPARTMENTS_CREATE])
  @Post('departments')
  @UsePipes(new JoiValidationPipe)
  createDepartment(@Body() dto: CreateDepartmentsDto) {
    return this.enterpriseManagementService.createDepartment(dto);
  }

  @Roles([Permissions.DEPARTMENTS_UPDATE])
  @Put('departments/:id')
  @Patch('departments/:id')
  @UsePipes(new JoiValidationPipe)
  updateDepartment(@Param('id') id: string, @Body() dto: UpdateDepartmentsDto) {
    return this.enterpriseManagementService.updateDepartment(+id, dto);
  }

  @Roles([Permissions.DEPARTMENTS_DELETE])
  @Delete('departments/:id')
  deleteDepartment(@Param('id') id: string): Promise<boolean> {
    return this.enterpriseManagementService.deleteDepartment(+id);
  }


  // --------------------- SUBDEPARTMENTS ---------------------

  @Roles([Permissions.SUBDEPARTMENTS_READ])
  @Get('subdepartments')
  @UsePipes(new JoiValidationPipe)
  getSubDepartments(@Query() parameters: ListParametersDto): Promise<ListResponse<SubDepartments>> {
    return this.enterpriseManagementService.getSubDepartments(parameters);
  }

  @Roles([Permissions.SUBDEPARTMENTS_READ])
  @Get('subdepartments/:id')
  getSubDepartment(@Param('id') id: string) {
    return this.enterpriseManagementService.getSubDepartmentById(+id);
  }

  @Roles([Permissions.SUBDEPARTMENTS_CREATE])
  @Post('subdepartments')
  @UsePipes(new JoiValidationPipe)
  createSubDepartment(@Body() dto: CreateSubDepartmentsDto) {
    return this.enterpriseManagementService.createSubDepartment(dto);
  }

  @Roles([Permissions.SUBDEPARTMENTS_UPDATE])
  @Put('subdepartments/:id')
  @Patch('subdepartments/:id')
  @UsePipes(new JoiValidationPipe)
  updateSubDepartment(@Param('id') id: string, @Body() dto: UpdateSubDepartmentsDto) {
    return this.enterpriseManagementService.updateSubDepartment(+id, dto);
  }

  @Roles([Permissions.SUBDEPARTMENTS_DELETE])
  @Delete('subdepartments/:id')
  deleteSubDepartment(@Param('id') id: string): Promise<boolean> {
    return this.enterpriseManagementService.deleteSubDepartment(+id);
  }
}
