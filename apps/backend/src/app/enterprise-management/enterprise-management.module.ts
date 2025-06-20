import { Module } from '@nestjs/common';
import { EnterpriseManagementService } from './enterprise-management.service';
import { EnterprisesController } from './enterprises.controller';
import { BranchesController } from './branches.controller';
import { DepartmentsController } from './departments.controller';
import { SubDepartmentsController } from './subdepartments.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [
    EnterprisesController,
    BranchesController,
    DepartmentsController,
    SubDepartmentsController
  ],
  providers: [EnterpriseManagementService, PrismaService],
})
export class EnterpriseManagementModule {}
