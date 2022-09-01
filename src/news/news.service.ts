import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './news.model';
import { CreateNewsDto } from './dto/create.news.dto';
import { UserComments } from '../comments/comments.model';

import { HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';

import { CommentsService } from '../comments/comments.service';
import { CreateCommentsDto } from '../comments/dto/create.comments.dto';

import { CreateRatingsDto } from '../news-rating/dto/create.rating.dto';
import { NewsRatingService } from '../news-rating/news-rating.service';
import { NewsRating } from '../news-rating/rating.model';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News) private newsRepository: typeof News,
    private commentsService: CommentsService,
    private NewsRatingService: NewsRatingService
  ) {

  }

  async create(dto: CreateNewsDto) {
    const post = await this.newsRepository.create({ ...dto });
    return post;
  }

  async getAllNews() {
    const users = await this.newsRepository.findAll({
      where: {status: 'published'},
      include: [
        {model: UserComments},
        {model: NewsRating}
      ]
    });
    return users;
  }

  async addComment(dto: CreateCommentsDto) {
    const news = await this.newsRepository.findByPk(dto.newsId)
    const comment = await this.commentsService.createComment(dto)

    if (news && comment) {
      await news.$add('comments', comment.id)
      return dto
    }
    throw new HttpException('role didn`t add before or user are not found', HttpStatus.NOT_FOUND)
  }

  async updateStatus(params: any) {
    if(params.status && params.id) {
      await this.newsRepository.update(
        { status: params.status },
        { where: { id: params.id } }
      )
    }
  }

  async addRating(dto: CreateRatingsDto) {
    const news = await this.newsRepository.findOne({
      where: { id: dto.newsId },
      include: { model: NewsRating }
    })

    const average = (
      news.ratings.map((v) => v.rating)
    ).reduce((f, s) => f + s) / news.ratings.length

    await this.newsRepository.update(
      { averageRaiting: average },
      { where: { id: dto.newsId } }
    )

    const rating = await this.NewsRatingService.createRating(dto)

    if (news && rating) {
      await news.$add('ratings', rating.id)
      return dto
    }
    throw new HttpException('role didn`t add before or user are not found', HttpStatus.NOT_FOUND)
  }
}
