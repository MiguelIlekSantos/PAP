import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { SystemManagementService } from './system-management.service';
import { CreateUserDto, UpdateUserDto } from '../DTO/user.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { User } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('system-users')
export class SystemUsersController {
  constructor(
    private readonly systemManagementService: SystemManagementService,
  ) {}

  @Roles([Permissions.SYSTEM_USERS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getSystemUsers(@Query() parameters: ListParametersDto): Promise<ListResponse<User>> {
    return this.systemManagementService.getSystemUsers(parameters);
  }

  @Roles([Permissions.SYSTEM_USERS_READ])
  @Get(':id')
  getSystemUser(@Param('id') id: string) {
    return this.systemManagementService.getSystemUserById(+id);
  }

  @Roles([Permissions.SYSTEM_USERS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createSystemUser(@Body() dto: CreateUserDto) {
    return this.systemManagementService.createSystemUser(dto);
  }

  @Roles([Permissions.SYSTEM_USERS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateSystemUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.systemManagementService.updateSystemUser(+id, dto);
  }

  @Roles([Permissions.SYSTEM_USERS_DELETE])
  @Delete(':id')
  deleteSystemUser(@Param('id') id: string): Promise<boolean> {
    return this.systemManagementService.deleteSystemUser(+id);
  }
}