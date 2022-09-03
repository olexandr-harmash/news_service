import { Module, forwardRef } from '@nestjs/common';
import { CommentsService } from '../../services/comments.service';
import { CommentsController } from './comments.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import { News } from '../../models/news.model';
import { UserComments } from '../../models/comments.model';
import { NewsModule } from '../news/news.module';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [
    SequelizeModule.forFeature([News, UserComments]),
    forwardRef(() =>NewsModule)
  ],
  exports: [CommentsService]
})
export class CommentsModule {}
