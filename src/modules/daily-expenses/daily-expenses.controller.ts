import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DailyExpensesService } from './daily-expenses.service';
import { IDailyExpense } from './daily-expenses.model';
import { ErrorHandlerService } from 'src/utils/error-handler/error-handler.service';

@Controller('api/daily-expenses')
export class DailyExpensesController {
  constructor(
    private dailyExpensesService: DailyExpensesService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  @Get()
  async getDailyExpenses(@Query('ownerId') ownerId: string) {
    return this.dailyExpensesService.getDailyExpenses(ownerId);
  }

  @Post()
  async createDailyExpenses(@Body() body: Partial<Omit<IDailyExpense, '_id'>>) {
    try {
      const dailyExpense =
        await this.dailyExpensesService.createDailyExpenses(body);

      return {
        dailyExpense,
      };
    } catch (error) {
      return this.errorHandlerService.handleServerError(error);
    }
  }

  //delete
  @Delete(':id')
  async deleteDailyExpenses(@Param('id') id: string) {
    return this.dailyExpensesService.deleteDailyExpenses(id);
  }

  //update
  @Put()
  updateDailyExpenses(@Body() dailyExpense: IDailyExpense & { _id: string }) {
    return this.dailyExpensesService.updateDailyExpenses(dailyExpense);
  }
}
