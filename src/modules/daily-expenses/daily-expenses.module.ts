import { Module } from '@nestjs/common';
import { DailyExpensesController } from './daily-expenses.controller';
import { DailyExpensesService } from './daily-expenses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyExpenseSchema } from './daily-expenses.model';
import { ErrorHandlerService } from 'src/utils/error-handler/error-handler.service';

const DailyExpenseModel = {
  name: 'daily-expenses',
  schema: DailyExpenseSchema,
};

@Module({
  imports: [MongooseModule.forFeature([DailyExpenseModel])],
  controllers: [DailyExpensesController],
  providers: [DailyExpensesService, ErrorHandlerService],
})
export class DailyExpensesModule {}
