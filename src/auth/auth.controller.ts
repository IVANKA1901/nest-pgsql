import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginUser: LoginUserDto) {
    return await this.authService.login(loginUser);
  }

  @Post('/register')
  async register(@Body() registerUser: RegisterUserDto) {
    return this.authService.register(registerUser);
  }
}
