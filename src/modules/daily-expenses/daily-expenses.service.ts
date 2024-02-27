import { Injectable } from '@nestjs/common';
import { IDailyExpense } from './daily-expenses.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ErrorHandlerService } from 'src/utils/error-handler/error-handler.service';

@Injectable()
export class DailyExpensesService {
  constructor(
    @InjectModel('daily-expenses')
    private dailyExpensesModel: Model<IDailyExpense>,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async getDailyExpenses(id: string) {
    try {
      const query = { ownerId: id };
      const dailyExpenses = await this.dailyExpensesModel.find(query);

      const updatedDailyexpenses = dailyExpenses.map((dailyExpense) => ({
        id: dailyExpense._id,
        title: dailyExpense.title,
        amount: dailyExpense.amount,
        date: dailyExpense.date,
        ownerId: dailyExpense.ownerId,
      }));

      return updatedDailyexpenses;
    } catch (err) {
      console.log(err);
    }
  }

  async createDailyExpenses(body: Partial<Omit<IDailyExpense, '_id'>>) {
    try {
      const { title, amount, date, ownerId } = body;
      const dailyExpenseTemplate = {
        title,
        amount,
        date,
        ownerId,
      };

      const savedDailyExpense = new this.dailyExpensesModel(
        dailyExpenseTemplate,
      );
      await savedDailyExpense.save();

      const resUser = {
        ...dailyExpenseTemplate,
        id: savedDailyExpense._id.toString(),
      };

      return resUser;
    } catch (err) {
      return this.errorHandlerService.handleServerError(err);
    }
  }

  async deleteDailyExpenses(id: string) {
    try {
      const objectId = new Types.ObjectId(id);

      const newDailyExpense =
        await this.dailyExpensesModel.findByIdAndDelete(objectId);

      return newDailyExpense;
    } catch (err) {
      return this.errorHandlerService.handleServerError(err);
    }
  }

  async updateDailyExpenses(dailyExpense: IDailyExpense & { _id: string }) {
    try {
      const { _id, ...restDailyExpense } = dailyExpense;
      const updatedDailyExpense =
        await this.dailyExpensesModel.findByIdAndUpdate(_id, restDailyExpense, {
          new: true,
        });

      return updatedDailyExpense;
    } catch (err) {
      return this.errorHandlerService.handleServerError(err);
    }
  }
}
