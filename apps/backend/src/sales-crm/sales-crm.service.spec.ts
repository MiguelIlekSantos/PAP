import { Test, TestingModule } from '@nestjs/testing';
import { SalesCrmService } from './sales-crm.service';

describe('SalesCrmService', () => {
  let service: SalesCrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesCrmService],
    }).compile();

    service = module.get<SalesCrmService>(SalesCrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
