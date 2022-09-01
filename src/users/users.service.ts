import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesService } from '../roles/roles.service';
import { HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { AddRoleDto } from './dto/roles.users.dto';
import { News } from '../news/news.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {

  }
  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      const role = await this.roleService.getRoleByValue("user");
      await user.$set('roles', [role.id]);
      user.roles = [role];
      return user;
    } catch (err) {
      console.log(err)
      throw new HttpException('Yt yfq=lryj', HttpStatus.NOT_FOUND)
    }
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: [
        {
          model: Role,
          through: { attributes: [] }
        },
        {
          model: News,
          attributes: { exclude: ['userId'] }
        }
      ]
    });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: {
        model: Role,
        through: { attributes: [] }
      },
    });
    if (user) {
      return user
    }
    throw new HttpException('Yt yfq=lryj', HttpStatus.NOT_FOUND)
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.roleService.getRoleByValue(dto.value)

    if (role && user) {
      await user.$add('role', role.id)
      return dto
    }
    throw new HttpException('role didn`t add before or user are not found', HttpStatus.NOT_FOUND)
  }
}
