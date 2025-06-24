import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { SystemManagementService } from './system-management.service';
import { CreateLogsDto, UpdateLogsDto } from '../DTO/logs.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Logs } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('system-logs')
export class SystemLogsController {
  constructor(
    private readonly systemManagementService: SystemManagementService,
  ) {}

  @Roles([Permissions.SYSTEM_LOGS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getSystemLogs(@Query() parameters: ListParametersDto): Promise<ListResponse<Logs>> {
    return this.systemManagementService.getSystemLogs(parameters);
  }

  @Roles([Permissions.SYSTEM_LOGS_READ])
  @Get(':id')
  getSystemLog(@Param('id') id: string) {
    return this.systemManagementService.getSystemLogById(+id);
  }

  @Roles([Permissions.SYSTEM_LOGS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createSystemLog(@Body() dto: CreateLogsDto) {
    return this.systemManagementService.createSystemLog(dto);
  }

  @Roles([Permissions.SYSTEM_LOGS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateSystemLog(@Param('id') id: string, @Body() dto: UpdateLogsDto) {
    return this.systemManagementService.updateSystemLog(+id, dto);
  }

  @Roles([Permissions.SYSTEM_LOGS_DELETE])
  @Delete(':id')
  deleteSystemLog(@Param('id') id: string): Promise<boolean> {
    return this.systemManagementService.deleteSystemLog(+id);
  }
}