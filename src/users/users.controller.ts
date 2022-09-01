import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';

import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { User } from './users.model';

import { JwtRolesAuthGuard, Roles } from '../auth/jwt-roles.guard';
import { AddRoleDto } from './dto/roles.users.dto';

import { ValidationPipe } from '../pipes/validation.pipe';
import {UsePipes} from '@nestjs/common';

@ApiTags('users')
  @Controller('users')
  export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'create user'})
    @ApiResponse({status: 200, type: User})
    @Roles('user')
    @UseGuards(JwtRolesAuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
      console.log(userDto)
      return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'fetch users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('user')
    //@UseGuards(JwtRolesAuthGuard)
    @UsePipes(ValidationPipe)
    @Get()
    getAll() {
      return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'add role to users'})
    @ApiResponse({status: 200, type: AddRoleDto})
    @Roles('user')
    @UseGuards(JwtRolesAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
      return this.usersService.addRole(dto);
    }
  }
