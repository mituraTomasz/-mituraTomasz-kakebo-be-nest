import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser, IUserWithoutId } from './user.model';

@Controller('auth/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    try {
      return this.usersService.login(body.username, body.password);
    } catch (error) {
      throw new HttpException(
        { message: 'Internal server error', error: error.message },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('register')
  async register(@Body() user: IUserWithoutId) {
    try {
      await this.usersService.register(user);

      return { success: true };
    } catch (error) {
      throw new HttpException(
        { message: 'Internal server error', error: error.message },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('logout')
  async logoutUser(@Req() request: Request) {
    const authorization = request.headers['authorization'];
    const token = authorization?.split(' ')[1];

    try {
      await this.usersService.logout(token);

      return { success: true };
    } catch (error) {
      throw new HttpException(
        { message: 'Internal server error', error: error.message },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Get('verify')
  async verifyUser(@Req() request: Request) {
    const authorization = request.headers['authorization'];
    const token = authorization?.split(' ')[1];

    try {
      const user = await this.usersService.verify(token);

      return { user };
    } catch (error) {
      throw new HttpException(
        { message: 'Internal server error', error: error.message },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
