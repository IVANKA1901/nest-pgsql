import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const authHeaders = request.headers.authorization;
      const bearer = authHeaders.split(' ')[0];
      const token = authHeaders.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }

      const user = this.jwtService.verify(token, {
        publicKey: 'secret',
      });
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }
  }
}
