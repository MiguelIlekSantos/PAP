import { Test, TestingModule } from '@nestjs/testing';
import { EnterpriseManagementService } from './enterprise-management.service';

describe('EnterpriseManagementService', () => {
  let service: EnterpriseManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnterpriseManagementService],
    }).compile();

    service = module.get<EnterpriseManagementService>(EnterpriseManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
