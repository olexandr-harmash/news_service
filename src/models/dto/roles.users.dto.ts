import {ApiProperty} from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, IsEmail } from 'class-validator'
import { UserRole } from '../../models/roles-values'

export class AddRoleDto {
  @ApiProperty({example:'admin', description:'role value'})
  @IsString({message: 'must be a namber'})
  @IsEnum(UserRole)
  readonly value: string;

  @ApiProperty({example:'56', description:'user id'})
  @IsEmail({}, {message: 'must be a namber'})
  readonly userEmail: string;
}
