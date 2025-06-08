import { Test, TestingModule } from '@nestjs/testing';
import { EnterpriseManagementController } from './enterprise-management.controller';
import { EnterpriseManagementService } from './enterprise-management.service';

describe('EnterpriseManagementController', () => {
  let controller: EnterpriseManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnterpriseManagementController],
      providers: [EnterpriseManagementService],
    }).compile();

    controller = module.get<EnterpriseManagementController>(EnterpriseManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
