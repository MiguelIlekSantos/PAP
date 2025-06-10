import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FinancialManagementService } from './financial-management.service';

@Controller('financial-management')
export class FinancialManagementController {
  constructor(private readonly financialManagementService: FinancialManagementService) {}

  // @Post()
  // create(@Body() createFinancialManagementDto: CreateFinancialManagementDto) {
  //   return this.financialManagementService.create(createFinancialManagementDto);
  // }

  @Get()
  findAll() {
    return this.financialManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financialManagementService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFinancialManagementDto: UpdateFinancialManagementDto) {
  //   return this.financialManagementService.update(+id, updateFinancialManagementDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financialManagementService.remove(+id);
  }
}
