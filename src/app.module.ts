import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { DailyExpensesModule } from './modules/daily-expenses/daily-expenses.module';

const mongoosePath =
  'mongodb+srv://mitur5g:onlyProgrammers@cluster0.fkejnpl.mongodb.net/Kakebo';

@Module({
  imports: [
    MongooseModule.forRoot(mongoosePath),
    UsersModule,
    DailyExpensesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
