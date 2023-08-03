import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

import { PrismaService } from 'src/core/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async getUserById(userId: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { id: Number(userId) },
      // select: {
      //   email: true,
      //   username: true,
      // },
      // include: { posts: true },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prismaService.user.create({
      data,
    });
  }

  async deleteUser(userId: string) {
    return await this.prismaService.user.delete({
      where: {
        id: Number(userId),
      },
    });
  }

  async updateUser(
    data: Prisma.UserUpdateInput,
    userId: string,
  ): Promise<User> {
    return await this.prismaService.user.update({
      where: { id: Number(userId) },
      data: {
        username: data.username,
        age: data.age,
        status: data.status,
      },
    });
  }
}
