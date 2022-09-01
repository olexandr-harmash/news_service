import {ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport';

import { SetMetadata } from '@nestjs/common';

const ROLES_KEY = 'roles'

const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)

@Injectable()
class JwtRolesAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const roles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      );
      if (!roles) {
        return false;
      }

      if (!await super.canActivate(context)) {
        return false;
      }

      return req.user.roles.some(
        (role: any) => roles.includes(role.value)
      );
    } catch (err) {
        throw new HttpException("guards was worked", HttpStatus.FORBIDDEN);
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new HttpException("guards was worked", HttpStatus.FORBIDDEN);;
    }
    return user;
  }
}

export {
  ROLES_KEY,
  Roles,
  JwtRolesAuthGuard
}
