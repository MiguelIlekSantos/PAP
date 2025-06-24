import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Reports } from '@prisma/client';
import { BaseService } from '../../base/base.service';
import { ListParametersDto } from '../DTO/list/list.dto';
import { CreateReportsDto, UpdateReportsDto } from '../DTO/reports.dto';

@Injectable()
export class ReportsService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  private readonly reportModel: keyof PrismaService = 'reports';

  // ----------------- Reports -----------------
  async getReports(parameters: ListParametersDto) {
    return this.findAll<Reports>(this.reportModel, parameters, 'name');
  }

  async getReportById(id: number) {
    return this.findOne(this.reportModel, id);
  }

  async createReport(data: CreateReportsDto) {
    return this.create<Reports, CreateReportsDto>(this.reportModel, data);
  }

  async updateReport(id: number, data: UpdateReportsDto) {
    return this.update<Reports, UpdateReportsDto>(this.reportModel, id, data);
  }

  async deleteReport(id: number) {
    return this.delete<Reports>(this.reportModel, id);
  }
}