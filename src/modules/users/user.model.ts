import { Controller } from '@nestjs/common';
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: 'string', required: true },
  password: { type: 'string', required: true },
  email: { type: 'string', required: true },
});

export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
}

export interface IUserWithoutId extends Partial<Omit<IUser, '_id'>> {}
