import {Model, Table, Column, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import { User } from '../users/users.model';
import { News } from '../news/news.model';

interface CommentCreatedAttr {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({tableName: 'user_comments'})
export class UserComments extends Model <UserComments, CommentCreatedAttr> {
  @ApiProperty({example:'1', description:'unique identif'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey:true
  })
  id: number;

  @ForeignKey(()=>News)
  @ApiProperty({example:'241', description:'news id'})
  @Column({
    type: DataType.INTEGER
  })
  newsId: string;

  @ApiProperty({example:'93', description:'user id'})
  @Column({
    type: DataType.INTEGER
  })
  userId: string;

  @ApiProperty({example:'It was great!!!', description:'content'})
  @Column({
    type: DataType.STRING
  })
  comment: string;

  @BelongsTo(() => News)
  news: News;
}
