import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from '../models/news.model';
import { CreateNewsDto } from '../models/dto/create.news.dto';
import { UserComments } from '../models/comments.model';

import { HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';

import { CommentsService } from '../services/comments.service';
import { CreateCommentsDto } from '../models/dto/create.comments.dto';

import { CreateRatingsDto } from '../models/dto/create.rating.dto';
import { NewsRatingService } from '../services/news-rating.service';
import { NewsRating } from '../models/rating.model';
import { UsersService } from '../services/users.service';

import { Status } from '../models/dto/update.news.status.dto'
import { Role } from '../models/roles.model'

import { ApiErrors, InternalErrorsMessage } from '../exceptions/api.exceptions';

interface Post {
  Prepare(dto: CreateNewsDto): CreateNewsDto
}

class PostForModerate implements Post {
  Prepare(dto: CreateNewsDto) {
    return { ...dto, status: Status.PENDING_APPROVAL }
  }
}

class PostForPublish implements Post {
  Prepare(dto: CreateNewsDto) {
    return { ...dto, status: Status.PUBLISHED }
  }
}

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News) private newsRepository: typeof News,
    private commentsService: CommentsService,
    private newsRatingService: NewsRatingService,
    private usersService: UsersService
  ) {

  }

  //можно брать айди юзера с токена, но для простоты оставим так
  async create(dto: CreateNewsDto) {
    try {
      const user = await this.usersService.getUserById(dto.userId)
      const post = user.roles.find((v) => v.value === 'admin') ? new PostForPublish() : new PostForModerate()
      const news = await this.newsRepository.create({ ...post.Prepare(dto) });
      return news;
    } catch (err) {
      throw ApiErrors.parseError(err)
    }
  }

  async getAllNews() {
    const users = await this.newsRepository.findAll({
      where: { status: 'published' },
      include: [
        { model: UserComments },
        { model: NewsRating }
      ]
    });
    return users;
  }

  async addComment(dto: CreateCommentsDto) {
    try {
      await this.usersService.getUserById(dto.userId)
      const news = await this.newsRepository.findByPk(dto.newsId)
      const comment = await this.commentsService.createComment(dto)
      await news.$add('comments', comment.id)
      return dto
    } catch (err) {
      throw ApiErrors.parseError(err)
    }
  }

  async updateStatus(params: any) {
    if (params.status && params.id) {
      try {
        await this.newsRepository.update(
          { status: params.status },
          { where: { id: params.id } }
        )
      } catch (err) {
        throw ApiErrors.parseError(err)
      }
    } else {
      throw new HttpException(InternalErrorsMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST)
    }
  }

  async deleteNews(id: number) {
    console.log(id)
    try {
      await this.newsRepository.destroy({where: {id: id}});
    } catch(err) {
      throw ApiErrors.parseError(err)
    }
  }

  //можно оставить обновление рейтинга постгресу
  async addRating(dto: CreateRatingsDto) {
    try {
      const news = await this.newsRepository.findOne({
        where: { id: dto.newsId },
        include: { model: NewsRating }
      })

      if (news) {
        if (news.ratings.find(v=>v.userId === dto.userId)) {
          throw new HttpException(InternalErrorsMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST)
        }

        const rating = await this.newsRatingService.createRating(dto)

        await news.$add('ratings', rating.id)
        news.ratings.push(rating)

        if (news.ratings.length > 2) {
          const average = (
            news.ratings.map((v) => v.rating)
          ).reduce((f, s) => f + s) / news.ratings.length

          await this.newsRepository.update(
            { averageRating: average },
            { where: { id: dto.newsId } }
          )
        }
        return dto
      }
    } catch (err) {
      throw ApiErrors.parseError(err)
    }
    throw new HttpException(InternalErrorsMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
  }
}
