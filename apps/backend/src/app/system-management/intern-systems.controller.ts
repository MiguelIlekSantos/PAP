import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { SystemManagementService } from './system-management.service';
import { CreateInternSystemsDto, UpdateInternSystemsDto } from '../DTO/internsystems.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { InternSystems } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('intern-systems')
export class InternSystemsController {
  constructor(
    private readonly systemManagementService: SystemManagementService,
  ) {}

  @Roles([Permissions.INTERN_SYSTEMS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getInternSystems(@Query() parameters: ListParametersDto): Promise<ListResponse<InternSystems>> {
    return this.systemManagementService.getInternSystems(parameters);
  }

  @Roles([Permissions.INTERN_SYSTEMS_READ])
  @Get(':id')
  getInternSystem(@Param('id') id: string) {
    return this.systemManagementService.getInternSystemById(+id);
  }

  @Roles([Permissions.INTERN_SYSTEMS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createInternSystem(@Body() dto: CreateInternSystemsDto) {
    return this.systemManagementService.createInternSystem(dto);
  }

  @Roles([Permissions.INTERN_SYSTEMS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateInternSystem(@Param('id') id: string, @Body() dto: UpdateInternSystemsDto) {
    return this.systemManagementService.updateInternSystem(+id, dto);
  }

  @Roles([Permissions.INTERN_SYSTEMS_DELETE])
  @Delete(':id')
  deleteInternSystem(@Param('id') id: string): Promise<boolean> {
    return this.systemManagementService.deleteInternSystem(+id);
  }
}