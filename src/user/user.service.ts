import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users = [];

  getAll() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: CreateUserDto) {
    this.users.push({
      ...user,
      id: new Date(),
    });
    return user;
  }

  deleteUser(id: string) {
    return this.users.filter((user) => user.id !== id);
  }
}
