import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { EnterpriseManagementService } from './enterprise-management.service';
import { CreateEnterpriseDto } from '../DTO/enterprise.dto';
import { JoiValidationPipe } from '@pap/utils';

@Controller('enterprises')
export class EnterpriseManagementController {
  constructor(private readonly enterpriseManagementService: EnterpriseManagementService) {}

  @Post()
  @UsePipes(new JoiValidationPipe)
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseManagementService.create(createEnterpriseDto);
  }

  @Get()
  findAll() {
    return this.enterpriseManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enterpriseManagementService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEnterpriseManagementDto: UpdateEnterpriseManagementDto) {
  //   return this.enterpriseManagementService.update(+id, updateEnterpriseManagementDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enterpriseManagementService.remove(+id);
  }
}
