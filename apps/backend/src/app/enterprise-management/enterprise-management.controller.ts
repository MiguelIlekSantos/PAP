import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query, Put } from '@nestjs/common';
import { EnterpriseManagementService } from './enterprise-management.service';
import { CreateEnterpriseDto, UpdateEnterpriseDto } from '../DTO/enterprise.dto';
import { JoiValidationPipe, ListResponse } from '@pap/utils';
import { Enterprise } from '@prisma/client';
import { ListParametersDto } from '../DTO/list/list.dto';

@Controller('enterprises')
export class EnterpriseManagementController {
  constructor(private readonly enterpriseManagementService: EnterpriseManagementService) { }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enterpriseManagementService.findOne(+id);
  }

  @Get()
  @UsePipes(new JoiValidationPipe)
  findAll(@Query() parameters: ListParametersDto): Promise<ListResponse<Enterprise>> {
    return this.enterpriseManagementService.findAll(parameters);
  }

  @Post()
  @UsePipes(new JoiValidationPipe)
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseManagementService.createEnterprise(createEnterpriseDto);
  }

  @Put(':id')
  @Patch(':id')
  @UsePipes(new JoiValidationPipe)
  update(@Param('id') id: string, @Body() updateEnterpriseDto: UpdateEnterpriseDto) {
    return this.enterpriseManagementService.updateEnterprise(+id, updateEnterpriseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.enterpriseManagementService.deleteEnterprise(+id);
  }
}
