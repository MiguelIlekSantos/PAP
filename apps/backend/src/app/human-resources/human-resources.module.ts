import { Module } from '@nestjs/common';
import { HumanResourcesService } from './human-resources.service';
import { EmployeesController } from './employees.controller';
import { TasksController } from './tasks.controller';
import { UsersController } from './users.controller';
import { LogsController } from './logs.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [
    EmployeesController,
    TasksController,
    UsersController,
    LogsController
  ],
  providers: [HumanResourcesService, PrismaService],
})
export class HumanResourcesModule {}
