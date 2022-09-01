import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import { News } from '../news/news.model';
import { UserComments } from './comments.model';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [
    SequelizeModule.forFeature([News, UserComments]),
  ],
  exports: [CommentsService]
})
export class CommentsModule {}
