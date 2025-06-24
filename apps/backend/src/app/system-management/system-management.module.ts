import { Module } from '@nestjs/common';
import { SystemManagementService } from './system-management.service';
import { SystemUsersController } from './system-users.controller';
import { InternSystemsController } from './intern-systems.controller';
import { SystemLogsController } from './system-logs.controller';
import { DocumentsController } from './documents.controller';
import { DomainsController } from './domains.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [
    SystemUsersController,
    InternSystemsController,
    SystemLogsController,
    DocumentsController,
    DomainsController
  ],
  providers: [SystemManagementService, PrismaService],
})
export class SystemManagementModule {}
