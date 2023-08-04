import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/core/prisma.service';

@Module({
  imports: [AuthModule],
  providers: [AuthService, UserService, JwtService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
