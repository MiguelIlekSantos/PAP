import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportsDto, UpdateReportsDto } from '../DTO/reports.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Reports } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('reports')
export class ReportsDataController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Roles([Permissions.REPORTS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getReports(@Query() parameters: ListParametersDto): Promise<ListResponse<Reports>> {
    return this.reportsService.getReports(parameters);
  }

  @Roles([Permissions.REPORTS_READ])
  @Get(':id')
  getReport(@Param('id') id: string) {
    return this.reportsService.getReportById(+id);
  }

  @Roles([Permissions.REPORTS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createReport(@Body() dto: CreateReportsDto) {
    return this.reportsService.createReport(dto);
  }

  @Roles([Permissions.REPORTS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateReport(@Param('id') id: string, @Body() dto: UpdateReportsDto) {
    return this.reportsService.updateReport(+id, dto);
  }

  @Roles([Permissions.REPORTS_DELETE])
  @Delete(':id')
  deleteReport(@Param('id') id: string): Promise<boolean> {
    return this.reportsService.deleteReport(+id);
  }
}