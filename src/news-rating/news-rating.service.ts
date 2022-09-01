import { Injectable } from '@nestjs/common';
import { CreateRatingsDto } from './dto/create.rating.dto';
import { NewsRating } from './rating.model';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class NewsRatingService {
  constructor(@InjectModel(NewsRating) private newsRatingRepository: typeof NewsRating) {

  }
  async createRating(dto: CreateRatingsDto) {
    const rating = await this.newsRatingRepository.create(dto);
    return rating;
  }

  // async deleteComment(id: number) {
  //   const comment = await this.commentsRepository.de(dto);
  //   return comment;
  // }

  async getRatingsByNews(value: string) {
    const rating = await this.newsRatingRepository.findOne({where: {value}});
    return rating;
  }
}
