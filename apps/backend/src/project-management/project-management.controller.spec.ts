import { Test, TestingModule } from '@nestjs/testing';
import { ProjectManagementController } from './project-management.controller';
import { ProjectManagementService } from './project-management.service';

describe('ProjectManagementController', () => {
  let controller: ProjectManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectManagementController],
      providers: [ProjectManagementService],
    }).compile();

    controller = module.get<ProjectManagementController>(ProjectManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
