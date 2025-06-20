import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { EnterpriseManagementService } from './enterprise-management.service';
import { CreateBranchesDto, UpdateBranchesDto } from '../DTO/branches.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Branches } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('branches')
export class BranchesController {
  constructor(
    private readonly enterpriseManagementService: EnterpriseManagementService,
  ) {}

  @Roles([Permissions.BRANCHES_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getBranches(@Query() parameters: ListParametersDto): Promise<ListResponse<Branches>> {
    return this.enterpriseManagementService.getBranches(parameters);
  }

  @Roles([Permissions.BRANCHES_READ])
  @Get(':id')
  getBranch(@Param('id') id: string) {
    return this.enterpriseManagementService.getBranchById(+id);
  }

  @Roles([Permissions.BRANCHES_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createBranch(@Body() dto: CreateBranchesDto) {
    return this.enterpriseManagementService.createBranch(dto);
  }

  @Roles([Permissions.BRANCHES_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateBranch(@Param('id') id: string, @Body() dto: UpdateBranchesDto) {
    return this.enterpriseManagementService.updateBranch(+id, dto);
  }

  @Roles([Permissions.BRANCHES_DELETE])
  @Delete(':id')
  deleteBranch(@Param('id') id: string): Promise<boolean> {
    return this.enterpriseManagementService.deleteBranch(+id);
  }
}