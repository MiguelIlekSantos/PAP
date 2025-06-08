import { Test, TestingModule } from '@nestjs/testing';
import { SystemManagementController } from './system-management.controller';
import { SystemManagementService } from './system-management.service';

describe('SystemManagementController', () => {
  let controller: SystemManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemManagementController],
      providers: [SystemManagementService],
    }).compile();

    controller = module.get<SystemManagementController>(SystemManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
