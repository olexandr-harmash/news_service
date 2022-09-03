import { Injectable } from '@nestjs/common';
import { CreateCommentsDto } from '../models/dto/create.comments.dto';
import { UserComments } from '../models/comments.model';
import { InjectModel } from '@nestjs/sequelize';
import { ApiErrors, InternalErrorsMessage } from '../exceptions/api.exceptions';
import { HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(UserComments) private commentsRepository: typeof UserComments) {

  }
  async createComment(dto: CreateCommentsDto) {
    try {
      const comment = await this.commentsRepository.create(dto);
      return comment;
    } catch (err) {
      throw ApiErrors.parseError(err)
    }
  }

  async deleteComment(id: number) {
    try {
      await this.commentsRepository.destroy({where: {id: id}});
    } catch(err) {
      throw ApiErrors.parseError(err)
    }
  }

  async getCommentsByNews(value: string) {
    try {
      const comment = await this.commentsRepository.findOne({ where: { value } });
      if (comment) {
        return comment;
      }

    } catch (err) {
      throw ApiErrors.parseError(err)
    }
    throw new HttpException(InternalErrorsMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
  }
}
