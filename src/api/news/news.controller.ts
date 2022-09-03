import { Controller, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { NewsService } from '../../services/news.service';
import { CreateNewsDto } from '../../models/dto/create.news.dto';
import { EditStatusParams } from '../../models/dto/update.news.status.dto';

import { JwtRolesAuthGuard, Roles } from '../../guards/jwt-roles.guard';

import { ValidationPipe } from '../../pipes/validation.pipe';
import {UsePipes, UseGuards} from '@nestjs/common';

import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {News} from '../../models/news.model';

import {CreateCommentsDto} from '../../models/dto/create.comments.dto';
import {CreateRatingsDto} from '../../models/dto/create.rating.dto';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private postsService: NewsService) {}

  @ApiOperation({summary: 'create user'})
  @ApiResponse({status: 200, type: News})
  @Roles('default', 'user', 'moderator', 'admin')
  @UseGuards(JwtRolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Get()
  getAllNews(){
    return this.postsService.getAllNews();
  }

  @ApiOperation({summary: 'create user'})
  @ApiResponse({status: 200, type: News})
  @Roles('user', 'moderator', 'admin')
  @UseGuards(JwtRolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  createPost(@Body() dto: CreateNewsDto){
    return this.postsService.create(dto);
  }

  //можно добавить логику чтоб пользователь мог удалять свои записи, но пока пусть этим занимаются работники
  @ApiOperation({summary: 'create user'})
  @ApiResponse({status: 200, type: News})
  @Roles('moderator', 'admin')
  @UseGuards(JwtRolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Delete('/:id')
  deleteNews(@Param('id') id: number){
    return this.postsService.deleteNews(id);
  }

  @ApiOperation({summary: 'create user'})
  @ApiResponse({status: 200, type: News})
  @Roles('moderator', 'admin')
  @UseGuards(JwtRolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Patch('/:id/:status')
  updateStatus(@Param() params: EditStatusParams){
    return this.postsService.updateStatus(params);
  }
}
