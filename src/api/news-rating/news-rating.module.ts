import { Module, forwardRef } from '@nestjs/common';
import { NewsRatingController } from './news-rating.controller';
import { NewsRatingService } from '../../services/news-rating.service';

import {SequelizeModule} from '@nestjs/sequelize';
import { News } from '../../models/news.model';
import { NewsRating } from '../../models/rating.model';

import { NewsModule } from '../news/news.module';

@Module({
  controllers: [NewsRatingController],
  providers: [NewsRatingService],
  imports: [
    SequelizeModule.forFeature([News, NewsRating]),
    forwardRef(() => NewsModule)
  ],
  exports: [NewsRatingService]
})
export class NewsRatingModule {}
