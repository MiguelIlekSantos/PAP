import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnterpriseManagementService } from './enterprise-management.service';
import { CreateEnterpriseManagementDto } from './dto/create-enterprise-management.dto';
import { UpdateEnterpriseManagementDto } from './dto/update-enterprise-management.dto';

@Controller('enterprise-management')
export class EnterpriseManagementController {
  constructor(private readonly enterpriseManagementService: EnterpriseManagementService) {}

  @Post()
  create(@Body() createEnterpriseManagementDto: CreateEnterpriseManagementDto) {
    return this.enterpriseManagementService.create(createEnterpriseManagementDto);
  }

  @Get()
  findAll() {
    return this.enterpriseManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enterpriseManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnterpriseManagementDto: UpdateEnterpriseManagementDto) {
    return this.enterpriseManagementService.update(+id, updateEnterpriseManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enterpriseManagementService.remove(+id);
  }
}
