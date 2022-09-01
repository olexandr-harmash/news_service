import { Controller, Post, Body, Get, Param, UseGuards, Request  } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create.user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    login(@Request() req) {
      return this.authService.login(req.user.dataValues.email);
    }

    @Post('/registration')
    register(@Body() userDto: CreateUserDto) {
      return this.authService.registration(userDto);
    }
  }
