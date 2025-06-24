import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsDataController } from './reports-data.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [
    ReportsDataController
  ],
  providers: [ReportsService, PrismaService],
})
export class ReportsModule {}
