import { Test, TestingModule } from '@nestjs/testing';
import { SalesCrmController } from './sales-crm.controller';
import { SalesCrmService } from './sales-crm.service';

describe('SalesCrmController', () => {
  let controller: SalesCrmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesCrmController],
      providers: [SalesCrmService],
    }).compile();

    controller = module.get<SalesCrmController>(SalesCrmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
