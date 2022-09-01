import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import {News} from './news/news.model';

import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { CommentsModule } from './comments/comments.module';
import { NewsRatingModule } from './news-rating/news-rating.module';

import { UserComments } from './comments/comments.model';
import { NewsRating } from './news-rating/rating.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, News, UserComments, NewsRating],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    NewsModule,
    CommentsModule,
    NewsRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
