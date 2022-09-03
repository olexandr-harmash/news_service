import { UsersService } from './users.service';
import { CreateUserDto } from '../models/dto/create.user.dto';
import {JwtService} from '@nestjs/jwt';
import {Injectable, HttpException, HttpStatus, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../models/users.model';
import { ApiErrors, InternalErrorsMessage } from '../exceptions/api.exceptions';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  )
  {

  }
  async login(email: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      return this.generateToken(user);
    } catch(err) {
      throw ApiErrors.parseError(err)
    }
  }

  //пересмотреть обработчики и вызовы ислючений, в некоторых ситуациях проще просто проверять возвращаемое значение и не обращать внимание на исключения
  async registration(userDto: CreateUserDto) {
      try {
      await this.userService.getUserByEmail(userDto.email)
      throw new HttpException(InternalErrorsMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST)
      } catch(err) {
        const error = ApiErrors.parseError(err)
        if (error.message === InternalErrorsMessage.NOT_FOUND) {
          const user = await this.userService.createUser(userDto)
          return this.generateToken(user)
        }
        throw error
      }
  }

  private async generateToken(user: User) {
    const meta = {email: user.email, id: user.id, roles: user.roles};
    return {
      token: this.jwtService.sign(meta)
    }
  }
}
