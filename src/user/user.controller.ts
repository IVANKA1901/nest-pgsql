import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/jwt-auth-guard';
// import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getUser(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  @Post('/:id')
  @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
