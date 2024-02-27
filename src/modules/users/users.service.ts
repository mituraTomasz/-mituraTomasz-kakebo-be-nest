import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, IUserWithoutId } from './user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    try {
      const user = await this.userModel.findOne({ username, password });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const token = await this.jwtService.signAsync({
        username,
        email: user.email,
        id: user._id.toString(),
      });

      const responseData = {
        token,
        username: user.username,
        email: user.email,
        id: user._id.toString(),
      };

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  async register(user: IUserWithoutId) {
    const { username, password, email } = user;
    const newUser = new this.userModel({
      username,
      password,
      email,
    });

    await newUser.save();
  }

  async logout(token: string) {
    if (!token) {
      throw new UnauthorizedException('Brak tokenu uwierzytelniającego.');
    }

    this.jwtService.verifyAsync;
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: 'secret-key',
      });
      return decoded;
    } catch (err) {
      throw new UnauthorizedException('Błąd weryfikacji tokenu.');
    }
  }

  async verify(token: string) {
    try {
      const decodedUser = this.jwtService.verifyAsync(token);

      return decodedUser;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
