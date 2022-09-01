import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create.role.dto';
import { Role } from './roles.model';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ValidationPipe } from '../pipes/validation.pipe';
import {UsePipes} from '@nestjs/common';

@ApiTags('roles')
  @Controller('roles')
  export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: 'create role'})
    @ApiResponse({status: 200, type: Role})
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() roleDto: CreateRoleDto) {
      return this.rolesService.createRole(roleDto);
    }

    @ApiOperation({summary: 'get role by value'})
    @ApiResponse({status: 200, type: [Role]})
    @UsePipes(ValidationPipe)
    @Get('/:value')
    getByValue(@Param('value') value: string) {
      return this.rolesService.getRoleByValue(value);
    }
  }
