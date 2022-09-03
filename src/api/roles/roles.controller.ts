import { RolesService } from '../../services/roles.service';
import { CreateRoleDto } from '../../models/dto/create.role.dto';
import { Role } from '../../models/roles.model';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';

import { JwtRolesAuthGuard, Roles } from '../../guards/jwt-roles.guard';
import { AddRoleDto } from '../../models/dto/roles.users.dto';

import { ValidationPipe } from '../../pipes/validation.pipe';
import { UsePipes } from '@nestjs/common';

@ApiTags('roles')
  @Controller('roles')
  export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: 'create role'})
    @ApiResponse({status: 200, type: Role})
    @Roles('moderator', 'admin')
    @UseGuards(JwtRolesAuthGuard)
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() roleDto: CreateRoleDto) {
      return this.rolesService.createRole(roleDto);
    }

    @ApiOperation({summary: 'get role by value'})
    @ApiResponse({status: 200, type: Role})
    @Get('/:value')
    getByValue(@Param('value') value: string) {
      return this.rolesService.getRoleByValue(value);
    }
  }
