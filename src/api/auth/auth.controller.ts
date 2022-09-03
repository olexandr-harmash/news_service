import { Controller, Post, Body, Get, Param, UseGuards, Request  } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { CreateUserDto } from '../../models/dto/create.user.dto';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
      return this.authService.login(userDto.email);
    }

    @Post('/registration')
    register(@Body() userDto: CreateUserDto) {
      return this.authService.registration(userDto);
    }
  }
