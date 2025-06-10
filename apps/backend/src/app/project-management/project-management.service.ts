import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectManagementService {
  // create(createProjectManagementDto: CreateProjectManagementDto) {
  //   return 'This action adds a new projectManagement';
  // }

  findAll() {
    return `This action returns all projectManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectManagement`;
  }

  // update(id: number, updateProjectManagementDto: UpdateProjectManagementDto) {
  //   return `This action updates a #${id} projectManagement`;
  // }

  remove(id: number) {
    return `This action removes a #${id} projectManagement`;
  }
}
