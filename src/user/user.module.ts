import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/core/prisma.service';
import { AuthGuard } from 'src/auth/guards/jwt-auth-guard';

@Module({
  imports: [UserModule],
  providers: [UserService, PrismaService, AuthGuard, JwtService],
  controllers: [UserController],
})
export class UserModule {}
