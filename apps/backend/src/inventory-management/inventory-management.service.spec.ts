import { Test, TestingModule } from '@nestjs/testing';
import { InventoryManagementService } from './inventory-management.service';

describe('InventoryManagementService', () => {
  let service: InventoryManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryManagementService],
    }).compile();

    service = module.get<InventoryManagementService>(InventoryManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
