import { Injectable } from '@nestjs/common';

@Injectable()
export class HumanResourcesService {
  // create(createHumanResourceDto: CreateHumanResourceDto) {
  //   return 'This action adds a new humanResource';
  // }

  findAll() {
    return `This action returns all humanResources`;
  }

  findOne(id: number) {
    return `This action returns a #${id} humanResource`;
  }

  // update(id: number, updateHumanResourceDto: UpdateHumanResourceDto) {
  //   return `This action updates a #${id} humanResource`;
  // }

  remove(id: number) {
    return `This action removes a #${id} humanResource`;
  }
}
