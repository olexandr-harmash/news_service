import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.PRIVATE_KEY || 'secretKey',
    });
  }

  async validate(meta: any) {
    return { userId: meta.id, email: meta.email, roles: meta.roles };
  }
}
