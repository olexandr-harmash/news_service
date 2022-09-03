import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../models/dto/create.role.dto';
import { Role } from '../models/roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrors, InternalErrorsMessage } from '../exceptions/api.exceptions';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {

  }
  async createRole(dto: CreateRoleDto) {
    try {
      const role = await this.roleRepository.create(dto);
      return role
    } catch (err) {
      throw ApiErrors.parseError(err)
    }
  }

  async getRoleByValue(value: string) {
    try {
      const role = await this.roleRepository.findOne({
        where: { value }
      });
      if (role) {
        return role;
      }
    } catch (err) {
      throw ApiErrors.parseError(err)
    }
    throw new HttpException(InternalErrorsMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
  }
}
