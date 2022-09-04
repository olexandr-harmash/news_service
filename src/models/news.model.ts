import { Model, Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.model';
import { UserComments } from './comments.model';
import { NewsRating } from './rating.model';

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

  @ApiProperty({ example: 'about USA', description: 'news title' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title: string;

  @ApiProperty({ example: 'something about enimals', description: 'news content' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  content: string;

  @ApiProperty({ example: '4.5', description: 'average rating min 0 max 5' })
  @Column({
    type: DataType.DOUBLE,
    defaultValue: 0,
  })
  averageRating: number;

  @ApiProperty({ example: '48', description: 'user who posted news' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  userId: number;

  @BelongsTo(() => User)
  author: User;

  @ApiProperty({ example: 'wow really good...', description: 'array of comments struct' })
  @HasMany(() => UserComments)
  comments: UserComments[];

  @ApiProperty({ example: '[{3...}, ...]', description: 'array of rating struct' })
  @HasMany(() => NewsRating)
  ratings: NewsRating[];
}
