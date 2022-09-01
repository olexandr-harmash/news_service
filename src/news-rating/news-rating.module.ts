import { Module } from '@nestjs/common';
import { NewsRatingController } from './news-rating.controller';
import { NewsRatingService } from './news-rating.service';

import {SequelizeModule} from '@nestjs/sequelize';
import { News } from '../news/news.model';
import { NewsRating } from './rating.model';

@Module({
  controllers: [NewsRatingController],
  providers: [NewsRatingService],
  imports: [
    SequelizeModule.forFeature([News, NewsRating]),
  ],
  exports: [NewsRatingService]
})
export class NewsRatingModule {}
