import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { CommentsModule } from '../comments/comments.module';
import { NewsService } from './news.service';
import { User } from '../users/users.model';
import { News } from './news.model';
import {SequelizeModule} from '@nestjs/sequelize';
import { UserComments } from '../comments/comments.model';
import { NewsRatingModule } from '../news-rating/news-rating.module';
import { NewsRating } from '../news-rating/rating.model';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
    SequelizeModule.forFeature([User, News, UserComments, NewsRating]),
    CommentsModule,
    NewsRatingModule
  ],
  exports: [
    NewsService
  ]
})
export class NewsModule {}
