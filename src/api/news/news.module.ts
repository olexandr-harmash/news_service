import { Module, forwardRef } from '@nestjs/common';
import { NewsController } from './news.controller';
import { CommentsModule } from '../comments/comments.module';
import { NewsService } from '../../services/news.service';
import { User } from '../../models/users.model';
import { News } from '../../models/news.model';
import {SequelizeModule} from '@nestjs/sequelize';
import { UserComments } from '../../models/comments.model';
import { NewsRatingModule } from '../news-rating/news-rating.module';
import { NewsRating } from '../../models/rating.model';
import { UsersModule } from '../users/users.module';
@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
    SequelizeModule.forFeature([User, News, UserComments, NewsRating]),
    forwardRef(() => CommentsModule),
    forwardRef(() => NewsRatingModule),
    UsersModule
  ],
  exports: [
    NewsService
  ]
})
export class NewsModule {}
