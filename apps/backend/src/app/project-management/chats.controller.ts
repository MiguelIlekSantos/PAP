import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ProjectManagementService } from './project-management.service';
import { CreateChatsDto, UpdateChatsDto } from '../DTO/chats.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Chats } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('chats')
export class ChatsController {
  constructor(
    private readonly projectManagementService: ProjectManagementService,
  ) {}

  @Roles([Permissions.CHATS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getChats(@Query() parameters: ListParametersDto): Promise<ListResponse<Chats>> {
    return this.projectManagementService.getChats(parameters);
  }

  @Roles([Permissions.CHATS_READ])
  @Get(':id')
  getChat(@Param('id') id: string) {
    return this.projectManagementService.getChatById(+id);
  }

  @Roles([Permissions.CHATS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createChat(@Body() dto: CreateChatsDto) {
    return this.projectManagementService.createChat(dto);
  }

  @Roles([Permissions.CHATS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateChat(@Param('id') id: string, @Body() dto: UpdateChatsDto) {
    return this.projectManagementService.updateChat(+id, dto);
  }

  @Roles([Permissions.CHATS_DELETE])
  @Delete(':id')
  deleteChat(@Param('id') id: string): Promise<boolean> {
    return this.projectManagementService.deleteChat(+id);
  }
}