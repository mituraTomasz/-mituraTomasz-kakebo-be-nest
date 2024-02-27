import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { JwtModule } from '@nestjs/jwt';

const Jwt = JwtModule.register({
  secret: 'secret-key',
  signOptions: { expiresIn: '1h' },
});

@Module({
  imports: [
    Jwt,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
