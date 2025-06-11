import { Module } from '@nestjs/common';
import { EnterpriseManagementService } from './enterprise-management.service';
import { EnterpriseManagementController } from './enterprise-management.controller';
import { PrismaService } from '../../prisma.service';



@Module({
  controllers: [EnterpriseManagementController],
  providers: [EnterpriseManagementService, PrismaService],
})
export class EnterpriseManagementModule {}
