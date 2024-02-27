import { Test, TestingModule } from '@nestjs/testing';
import { DailyExpensesService } from './daily-expenses.service';

describe('DailyExpensesService', () => {
  let service: DailyExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyExpensesService],
    }).compile();

    service = module.get<DailyExpensesService>(DailyExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
