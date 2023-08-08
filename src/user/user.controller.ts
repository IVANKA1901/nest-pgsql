import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { CustomOkResponse } from 'src/core/swagger/swagger-helper';
import {
  SWAGGER_EXAMPLE_CREATE_USER,
  SWAGGER_EXAMPLE_GET_ALL_USERS,
  SWAGGER_EXAMPLE_GET_USER_BY_ID,
  SWAGGER_EXAMPLE_USER_DELETE,
} from 'src/core/swagger/swagger-examples/swagger-example-user.list';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @CustomOkResponse({
    exampleData: SWAGGER_EXAMPLE_GET_ALL_USERS,
    description: 'All users are successfully loaded',
  })
  @ApiBadRequestResponse()
  // @UseGuards(AuthGuard)
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Get('/:id')
  @ApiQuery({ name: 'id', type: 'string' })
  @CustomOkResponse({
    exampleData: SWAGGER_EXAMPLE_GET_USER_BY_ID,
    description: 'User is successfully found',
  })
  @UseGuards(AuthGuard)
  async getUser(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @CustomOkResponse({
    exampleData: SWAGGER_EXAMPLE_CREATE_USER,
    description: 'The user has been successfully created.',
  })
  @UseGuards(AuthGuard)
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  @Post('/:id')
  @ApiQuery({ name: 'id', type: 'string' })
  @CustomOkResponse({
    exampleData: SWAGGER_EXAMPLE_USER_DELETE,
    description: 'User is successfully deleted',
  })
  // @UseGuards(AuthGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
