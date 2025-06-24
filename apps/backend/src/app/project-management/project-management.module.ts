import { Module } from '@nestjs/common';
import { ProjectManagementService } from './project-management.service';
import { ProjectsController } from './projects.controller';
import { ProjectTasksController } from './project-tasks.controller';
import { ChatsController } from './chats.controller';
import { MessagesController } from './messages.controller';
import { ProjectBudgetController } from './project-budget.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [
    ProjectsController,
    ProjectTasksController,
    ChatsController,
    MessagesController,
    ProjectBudgetController
  ],
  providers: [ProjectManagementService, PrismaService],
})
export class ProjectManagementModule {}
