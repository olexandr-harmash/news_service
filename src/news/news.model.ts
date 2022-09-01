import { Model, Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserComments } from '../comments/comments.model';
import { NewsRating } from '../news-rating/rating.model';

interface NewsCreatedAttr {
  title: string;
  content: string;
  userId: number;
}

@Table({ tableName: 'news' })
export class News extends Model<News, NewsCreatedAttr> {
  @ApiProperty({ example: '1', description: 'unique identif' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  status: string;

  @ApiProperty({ example: 'admin', description: 'user role' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title: string;

  @ApiProperty({ example: 'can all', description: 'role tips' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  content: string;

  @ApiProperty({ example: 'can all', description: 'role tips' })
  @Column({
    type: DataType.NUMBER,
    defaultValue: 0,
  })
  averageRaiting: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  userId: number;

  @BelongsTo(() => User)
  author: User;

  @HasMany(() => UserComments)
  comments: UserComments[];

  @HasMany(() => NewsRating)
  ratings: NewsRating[];
}
