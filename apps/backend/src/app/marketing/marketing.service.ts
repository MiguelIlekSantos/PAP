import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketingService {
  // create(createMarketingDto: CreateMarketingDto) {
  //   return 'This action adds a new marketing';
  // }

  findAll() {
    return `This action returns all marketing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marketing`;
  }

  // update(id: number, updateMarketingDto: UpdateMarketingDto) {
  //   return `This action updates a #${id} marketing`;
  // }

  remove(id: number) {
    return `This action removes a #${id} marketing`;
  }
}
