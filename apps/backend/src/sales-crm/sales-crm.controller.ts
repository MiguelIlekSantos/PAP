import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesCrmService } from './sales-crm.service';
import { CreateSalesCrmDto } from './dto/create-sales-crm.dto';
import { UpdateSalesCrmDto } from './dto/update-sales-crm.dto';

@Controller('sales-crm')
export class SalesCrmController {
  constructor(private readonly salesCrmService: SalesCrmService) {}

  @Post()
  create(@Body() createSalesCrmDto: CreateSalesCrmDto) {
    return this.salesCrmService.create(createSalesCrmDto);
  }

  @Get()
  findAll() {
    return this.salesCrmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesCrmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalesCrmDto: UpdateSalesCrmDto) {
    return this.salesCrmService.update(+id, updateSalesCrmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesCrmService.remove(+id);
  }
}
