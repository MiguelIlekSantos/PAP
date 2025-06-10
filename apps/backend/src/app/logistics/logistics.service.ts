import { Injectable } from '@nestjs/common';

@Injectable()
export class LogisticsService {
  // create(createLogisticDto: CreateLogisticDto) {
  //   return 'This action adds a new logistic';
  // }

  findAll() {
    return `This action returns all logistics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logistic`;
  }

  // update(id: number, updateLogisticDto: UpdateLogisticDto) {
  //   return `This action updates a #${id} logistic`;
  // }

  remove(id: number) {
    return `This action removes a #${id} logistic`;
  }
}
