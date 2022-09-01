import { Injectable } from '@nestjs/common';
import { CreateCommentsDto } from './dto/create.comments.dto';
import { UserComments } from './comments.model';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class CommentsService {
  constructor(@InjectModel(UserComments) private commentsRepository: typeof UserComments) {

  }
  async createComment(dto: CreateCommentsDto) {
    const comment = await this.commentsRepository.create(dto);
    return comment;
  }

  // async deleteComment(id: number) {
  //   const comment = await this.commentsRepository.de(dto);
  //   return comment;
  // }

  async getCommentsByNews(value: string) {
    const comment = await this.commentsRepository.findOne({where: {value}});
    return comment;
  }
}
