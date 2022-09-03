import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/users.model';
import {SequelizeModule} from '@nestjs/sequelize';
import { Role } from '../../models/roles.model';
import { UserRoles } from '../../models/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import {News} from '../../models/news.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, News]),
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
