import { Injectable } from '@nestjs/common';
import { CreateProjectManagementDto } from './dto/create-project-management.dto';
import { UpdateProjectManagementDto } from './dto/update-project-management.dto';

@Injectable()
export class ProjectManagementService {
  create(createProjectManagementDto: CreateProjectManagementDto) {
    return 'This action adds a new projectManagement';
  }

  findAll() {
    return `This action returns all projectManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectManagement`;
  }

  update(id: number, updateProjectManagementDto: UpdateProjectManagementDto) {
    return `This action updates a #${id} projectManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectManagement`;
  }
}
