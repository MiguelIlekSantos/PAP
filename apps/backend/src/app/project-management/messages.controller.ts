import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ProjectManagementService } from './project-management.service';
import { CreateMessagesDto, UpdateMessagesDto } from '../DTO/messages.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Messages } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('messages')
export class MessagesController {
  constructor(
    private readonly projectManagementService: ProjectManagementService,
  ) {}

  @Roles([Permissions.MESSAGES_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getMessages(@Query() parameters: ListParametersDto): Promise<ListResponse<Messages>> {
    return this.projectManagementService.getMessages(parameters);
  }

  @Roles([Permissions.MESSAGES_READ])
  @Get(':id')
  getMessage(@Param('id') id: string) {
    return this.projectManagementService.getMessageById(+id);
  }

  @Roles([Permissions.MESSAGES_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createMessage(@Body() dto: CreateMessagesDto) {
    return this.projectManagementService.createMessage(dto);
  }

  @Roles([Permissions.MESSAGES_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateMessage(@Param('id') id: string, @Body() dto: UpdateMessagesDto) {
    return this.projectManagementService.updateMessage(+id, dto);
  }

  @Roles([Permissions.MESSAGES_DELETE])
  @Delete(':id')
  deleteMessage(@Param('id') id: string): Promise<boolean> {
    return this.projectManagementService.deleteMessage(+id);
  }
}