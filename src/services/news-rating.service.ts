import { Injectable } from '@nestjs/common';
import { CreateRatingsDto } from '../models/dto/create.rating.dto';
import { NewsRating } from '../models/rating.model';
import { InjectModel } from '@nestjs/sequelize';
import { ApiErrors, InternalErrorsMessage } from '../exceptions/api.exceptions';
import { HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class NewsRatingService {
  constructor(@InjectModel(NewsRating) private newsRatingRepository: typeof NewsRating) {

  }
  async createRating(dto: CreateRatingsDto) {
    try {
      const rating = await this.newsRatingRepository.create(dto);
      return rating;
    } catch (err) {
      throw ApiErrors.parseError(err)
    }
  }

  //лучше описать params
  async updateStatus(params: any) {
    if (params.rating && params.id) {
      try {
        await this.newsRatingRepository.update(
          { rating: params.rating },
          { where: { id: params.id } }
        )
      } catch (err) {
        throw ApiErrors.parseError(err)
      }
    } else {
      throw new HttpException(InternalErrorsMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST)
    }
  }

  async deleteRating(id: number) {
    try {
      await this.newsRatingRepository.destroy({where: {id: id}});
    } catch(err) {
      throw ApiErrors.parseError(err)
    }
  }

  async getRatingsByNews(value: string) {
    try {
      const rating = await this.newsRatingRepository.findOne({ where: { value } });
      if (rating) {
        return rating
      }
    } catch (err) {
      throw ApiErrors.parseError(err)
    }
    throw new HttpException(InternalErrorsMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
  }
}
