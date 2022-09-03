import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { CreateUserDto } from '../../models/dto/create.user.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../models/users.model';

import { JwtRolesAuthGuard, Roles } from '../../guards/jwt-roles.guard';
import { AddRoleDto } from '../../models/dto/roles.users.dto';

import { ValidationPipe } from '../../pipes/validation.pipe';
import { UsePipes } from '@nestjs/common';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiOperation({ summary: 'create user' })
  @ApiResponse({ status: 200, type: User })
  @Roles('admin')
  @UseGuards(JwtRolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @ApiOperation({ summary: 'fetch users' })
  @ApiResponse({ status: 200, type: [User] })
  //@Roles('user')
  //@UseGuards(JwtRolesAuthGuard)
  //@UsePipes(ValidationPipe)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'add role to users' })
  @ApiResponse({ status: 200, type: AddRoleDto })
  @Roles('admin')
  @UseGuards(JwtRolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }
}
