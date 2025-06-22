import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { HumanResourcesService } from './human-resources.service';
import { CreateLogsDto, UpdateLogsDto } from '../DTO/logs.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Logs } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('logs')
export class LogsController {
  constructor(
    private readonly humanResourcesService: HumanResourcesService,
  ) {}

  @Roles([Permissions.LOGS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getLogs(@Query() parameters: ListParametersDto): Promise<ListResponse<Logs>> {
    return this.humanResourcesService.getLogs(parameters);
  }

  @Roles([Permissions.LOGS_READ])
  @Get(':id')
  getLog(@Param('id') id: string) {
    return this.humanResourcesService.getLogById(+id);
  }

  @Roles([Permissions.LOGS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createLog(@Body() dto: CreateLogsDto) {
    return this.humanResourcesService.createLog(dto);
  }

  @Roles([Permissions.LOGS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateLog(@Param('id') id: string, @Body() dto: UpdateLogsDto) {
    return this.humanResourcesService.updateLog(+id, dto);
  }

  @Roles([Permissions.LOGS_DELETE])
  @Delete(':id')
  deleteLog(@Param('id') id: string): Promise<boolean> {
    return this.humanResourcesService.deleteLog(+id);
  }
}