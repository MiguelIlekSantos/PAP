import { Test, TestingModule } from '@nestjs/testing';
import { SystemManagementService } from './system-management.service';

describe('SystemManagementService', () => {
  let service: SystemManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemManagementService],
    }).compile();

    service = module.get<SystemManagementService>(SystemManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
