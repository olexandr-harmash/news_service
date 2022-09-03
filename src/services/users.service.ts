import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../models/dto/create.user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/users.model';
import { RolesService } from './roles.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Role } from '../models/roles.model';
import { AddRoleDto } from '../models/dto/roles.users.dto';
import { News } from '../models/news.model';
import { ApiErrors, InternalErrorsMessage } from '../exceptions/api.exceptions';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {
    //самый простой способ лучше при инициализации контейнера бд выполнить скрипт
    console.log('role')
    this.roleService.createRole({
      value: "default",
      description: "default",
    }).catch()
      .finally(() => {
        this.roleService.createRole({
          value: "admin",
          description: "admin",
        })
          .catch((err) => console.log('a'))
          .finally(() => {
            console.log('user')
            this.createUser({
              email: process.env.ADMIN_EMAIL,
              password: process.env.ADMIN_PASSWORD
            })
              .catch((err) => console.log('b'))
              .finally(() => {
                console.log('add')
                this.addRole({
                  value: 'admin',
                  userEmail: process.env.ADMIN_EMAIL
                }).catch((err) => console.log('c'))
              }
              )
          })
      }

      )
  }

  async createUser(dto: CreateUserDto) {
    try {
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
      const role = await this.roleService.getRoleByValue('default');
      const user = await this.userRepository.create({ ...dto, password: hash });
      if (user) {
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
      }
    } catch (err) {
      console.log(ApiErrors.parseError(err))
      throw ApiErrors.parseError(err)
    }
    //можно вызвать, если не создана роль, что вызовет недопонимания, но это уже совсем другая история
    throw new HttpException(InternalErrorsMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
  }

  async getAllUsers() {
    try {
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
    } catch (err) {
      throw ApiErrors.parseError(err)
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
        include: { model: Role }
      })
      if (user) {
        return user
      }
    } catch (err) {
      throw ApiErrors.parseError(err)
    }
    //можно и просто вызывать error
    throw new HttpException(InternalErrorsMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
  }

  async getUserByEmail(email: string) {
    try {
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
    } catch (err) {
      throw ApiErrors.parseError(err)
    }
    throw new HttpException(InternalErrorsMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
  }

  async addRole(dto: AddRoleDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: dto.userEmail }
      })
      const role = await this.roleService.getRoleByValue(dto.value)
      if (user && role) {
        await user.$add('role', role.id)
        return dto
      }
    } catch (err) {
      throw ApiErrors.parseError(err)
    }
    throw new HttpException(InternalErrorsMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
  }
}
