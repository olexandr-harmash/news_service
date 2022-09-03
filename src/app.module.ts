import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';

import { User } from './models/users.model';
import { Role } from './models/roles.model';
import { UserRoles } from './models/user-roles.model';
import {News} from './models/news.model';

import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './api/roles/roles.module';
import { AuthModule } from './api/auth/auth.module';
import { NewsModule } from './api/news/news.module';
import { CommentsModule } from './api/comments/comments.module';
import { NewsRatingModule } from './api/news-rating/news-rating.module';

import { UserComments } from './models/comments.model';
import { NewsRating } from './models/rating.model';

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
