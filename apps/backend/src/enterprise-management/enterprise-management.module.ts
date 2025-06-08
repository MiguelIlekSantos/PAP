import { Module } from '@nestjs/common';
import { EnterpriseManagementService } from './enterprise-management.service';
import { EnterpriseManagementController } from './enterprise-management.controller';

@Module({
  controllers: [EnterpriseManagementController],
  providers: [EnterpriseManagementService],
})
export class EnterpriseManagementModule {}
