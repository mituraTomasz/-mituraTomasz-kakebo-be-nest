import { Test, TestingModule } from '@nestjs/testing';
import { DailyExpensesController } from './daily-expenses.controller';

describe('DailyExpensesController', () => {
  let controller: DailyExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyExpensesController],
    }).compile();

    controller = module.get<DailyExpensesController>(DailyExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
