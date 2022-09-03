import { Module } from '@nestjs/common';
import { RolesService } from '../../services/roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import { Role } from '../../models/roles.model';
import { UserRoles } from '../../models/user-roles.model';
import { User } from '../../models/users.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
