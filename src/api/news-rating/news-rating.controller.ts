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

@Controller('rating')
export class NewsRatingController {
  constructor(private postsService: NewsService) {}

  @ApiOperation({summary: 'create user'})
  @ApiResponse({status: 200, type: News})
  @Roles('default', 'user', 'moderator', 'admin')
  @UseGuards(JwtRolesAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  addRating(@Body() dto: CreateRatingsDto){
    return this.postsService.addRating(dto);
  }
}
