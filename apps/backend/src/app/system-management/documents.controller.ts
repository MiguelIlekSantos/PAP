import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, UsePipes } from '@nestjs/common';
import { SystemManagementService } from './system-management.service';
import { CreateDocumentsDto, UpdateDocumentsDto } from '../DTO/documents.dto';
import { ListParametersDto } from '../DTO/list/list.dto';
import { Documents } from '@prisma/client';
import { JoiValidationPipe } from '../../lib/pipes/joi-validation.pipe';
import { Roles, RolesGuard } from '../../lib';
import { Permissions } from '../../data/permissionsList';
import { ListResponse } from '../../lib/interfaces/responses.interface';

@UseGuards(RolesGuard)
@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly systemManagementService: SystemManagementService,
  ) {}

  @Roles([Permissions.DOCUMENTS_READ])
  @Get()
  @UsePipes(new JoiValidationPipe)
  getDocuments(@Query() parameters: ListParametersDto): Promise<ListResponse<Documents>> {
    return this.systemManagementService.getDocuments(parameters);
  }

  @Roles([Permissions.DOCUMENTS_READ])
  @Get(':id')
  getDocument(@Param('id') id: string) {
    return this.systemManagementService.getDocumentById(+id);
  }

  @Roles([Permissions.DOCUMENTS_CREATE])
  @Post()
  @UsePipes(new JoiValidationPipe)
  createDocument(@Body() dto: CreateDocumentsDto) {
    return this.systemManagementService.createDocument(dto);
  }

  @Roles([Permissions.DOCUMENTS_UPDATE])
  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  updateDocument(@Param('id') id: string, @Body() dto: UpdateDocumentsDto) {
    return this.systemManagementService.updateDocument(+id, dto);
  }

  @Roles([Permissions.DOCUMENTS_DELETE])
  @Delete(':id')
  deleteDocument(@Param('id') id: string): Promise<boolean> {
    return this.systemManagementService.deleteDocument(+id);
  }
}