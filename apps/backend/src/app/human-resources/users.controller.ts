import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { HumanResourcesService } from './human-resources.service';
import { CreateUserDto, UpdateUserDto } from '../DTO/user.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { User } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly humanResourcesService: HumanResourcesService,
  ) {}

  @Roles([Permissions.USERS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getUsers(@Query() parameters: ListParametersDto): Promise<ListResponse<User>> {
    return this.humanResourcesService.getUsers(parameters);
  }

  @Roles([Permissions.USERS_READ])
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.humanResourcesService.getUserById(+id);
  }

  @Roles([Permissions.USERS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createUser(@Body() dto: CreateUserDto) {
    return this.humanResourcesService.createUser(dto);
  }

  @Roles([Permissions.USERS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.humanResourcesService.updateUser(+id, dto);
  }

  @Roles([Permissions.USERS_DELETE])
  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.humanResourcesService.deleteUser(+id);
  }
}