import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(authUser: RegisterUserDto) {
    const findUser = await this.userService.getUserByEmail(authUser.email);

    if (findUser) {
      throw new HttpException(
        'User with this email is already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(authUser.password, 10);
    const user = await this.userService.createUser({
      ...authUser,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  async login(authUser: LoginUserDto) {
    const user = await this.validateUser(authUser);
    return this.generateToken(user);
  }

  private async validateUser(user: LoginUserDto) {
    const userDb = await this.userService.getUserByEmail(user.email);
    const passwordCompare = await bcrypt.compare(
      user.password,
      userDb.password,
    );

    if (userDb && passwordCompare) {
      return userDb;
    }
    throw new UnauthorizedException({ message: 'Wrong email or password' });
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, name: user.username, id: user.id };
    return {
      token: this.jwtService.sign(payload, {
        secret: 'secret',
      }),
    };
  }
}
