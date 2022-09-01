import {Model, Table, Column, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import { News } from '../news/news.model';

interface RatingCreatedAttr {
  userId: number;
  rating: number;
}

@Table({tableName: 'news_rating'})
export class NewsRating extends Model <NewsRating, RatingCreatedAttr> {
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
  newsId: number;

  @ApiProperty({example:'93', description:'user id'})
  @Column({
    unique: true,
    type: DataType.INTEGER
  })
  userId: number;

  @ApiProperty({example:'It was great!!!', description:'content'})
  @Column({
    type: DataType.INTEGER
  })
  rating: number;

  @BelongsTo(() => News)
  news: News;
}
