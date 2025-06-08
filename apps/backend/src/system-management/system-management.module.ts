import { Module } from '@nestjs/common';
import { SystemManagementService } from './system-management.service';
import { SystemManagementController } from './system-management.controller';

@Module({
  controllers: [SystemManagementController],
  providers: [SystemManagementService],
})
export class SystemManagementModule {}
