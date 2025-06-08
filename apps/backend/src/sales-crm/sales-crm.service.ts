import { Injectable } from '@nestjs/common';
import { CreateSalesCrmDto } from './dto/create-sales-crm.dto';
import { UpdateSalesCrmDto } from './dto/update-sales-crm.dto';

@Injectable()
export class SalesCrmService {
  create(createSalesCrmDto: CreateSalesCrmDto) {
    return 'This action adds a new salesCrm';
  }

  findAll() {
    return `This action returns all salesCrm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesCrm`;
  }

  update(id: number, updateSalesCrmDto: UpdateSalesCrmDto) {
    return `This action updates a #${id} salesCrm`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesCrm`;
  }
}
