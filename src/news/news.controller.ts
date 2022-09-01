import { Controller, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Post, Body, Get, Param, Patch } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create.news.dto';
import { EditStatusParams } from './dto/update.news.status.dto';

import { JwtRolesAuthGuard, Roles } from '../auth/jwt-roles.guard';

import { ValidationPipe } from '../pipes/validation.pipe';
import {UsePipes, UseGuards} from '@nestjs/common';

import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {News} from './news.model';

import {CreateCommentsDto} from '../comments/dto/create.comments.dto';
import {CreateRatingsDto} from '../news-rating/dto/create.rating.dto';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private postsService: NewsService) {}

  @ApiOperation({summary: 'create user'})
  @ApiResponse({status: 200, type: News})
  //@Roles('user')
  //@UseGuards(JwtRolesAuthGuard)
  //@UsePipes(ValidationPipe)
  @Get()
  getAllNews(){
    return this.postsService.getAllNews();
  }

  @ApiOperation({summary: 'create user'})
  @ApiResponse({status: 200, type: News})
  //@Roles('user')
  //@UseGuards(JwtRolesAuthGuard)
  //@UsePipes(ValidationPipe)
  @Post()
  createPost(@Body() dto: CreateNewsDto){
    return this.postsService.create(dto);
  }

  @ApiOperation({summary: 'create user'})
  @ApiResponse({status: 200, type: News})
  //@Roles('user')
  //@UseGuards(JwtRolesAuthGuard)
  //@UsePipes(ValidationPipe)
  @Post('/comments')
  addComment(@Body() dto: CreateCommentsDto){
    return this.postsService.addComment(dto);
  }

  @ApiOperation({summary: 'create user'})
  @ApiResponse({status: 200, type: News})
  //@Roles('user')
  //@UseGuards(JwtRolesAuthGuard)
  //@UsePipes(ValidationPipe)
  @Post('/rating')
  addRating(@Body() dto: CreateRatingsDto){
    return this.postsService.addRating(dto);
  }

  @ApiOperation({summary: 'create user'})
  @ApiResponse({status: 200, type: News})
  //@Roles('moderator')
  //@UseGuards(JwtRolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Patch('/:id/:status')
  updateStatus(@Param() params: EditStatusParams){
    return this.postsService.updateStatus(params);
  }
}
