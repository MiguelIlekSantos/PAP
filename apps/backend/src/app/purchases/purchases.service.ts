import { Injectable } from '@nestjs/common';

@Injectable()
export class PurchasesService {
  // create(createPurchaseDto: CreatePurchaseDto) {
  //   return 'This action adds a new purchase';
  // }

  findAll() {
    return `This action returns all purchases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  // update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
  //   return `This action updates a #${id} purchase`;
  // }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
