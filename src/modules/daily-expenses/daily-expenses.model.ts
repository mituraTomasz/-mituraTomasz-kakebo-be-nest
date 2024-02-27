import { Schema } from 'mongoose';

export const DailyExpenseSchema = new Schema({
  title: { type: 'string', required: true },
  amount: { type: 'number', required: true },
  date: { type: 'date', required: true },
  ownerId: { type: 'string', required: true },
});

export interface IDailyExpense {
  _id: string;
  title: string;
  amount: number;
  date: Date;
  ownerId: string;
}

// export const UserSchema = new Schema({
//   username: { type: 'string', required: true },
//   password: { type: 'string', required: true },
//   email: { type: 'string', required: true },
// });

// export interface IUser {
//   _id: string;
//   username: string;
//   password: string;
//   email: string;
// }

// export interface IUserWithoutId extends Partial<Omit<IUser, '_id'>> {}
