import { Module } from '@nestjs/common';
import { AiModuleService } from './ai-module.service';
import { AiModuleController } from './ai-module.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [AiModuleController],
  providers: [AiModuleService, PrismaService],
})
export class AiModuleModule {}
