import { Test, TestingModule } from '@nestjs/testing';
import { FinancialManagementController } from './financial-management.controller';
import { FinancialManagementService } from './financial-management.service';

describe('FinancialManagementController', () => {
  let controller: FinancialManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialManagementController],
      providers: [FinancialManagementService],
    }).compile();

    controller = module.get<FinancialManagementController>(FinancialManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
