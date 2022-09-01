import { Module, forwardRef } from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import { UsersModule } from '../users/users.module';
import {JwtModule} from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secretKey',
      signOptions: {
        expiresIn: process.env.TOKEN_EXP || '2h'
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
