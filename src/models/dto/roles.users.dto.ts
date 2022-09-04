import {ApiProperty} from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, IsEmail } from 'class-validator'
import { UserRole } from '../../models/roles-values'

export class AddRoleDto {
  @ApiProperty({example:'admin', description:'role value'})
  @IsString({message: 'must be a namber'})
  @IsEnum(UserRole)
  readonly value: string;

  @ApiProperty({example:'cathanter@jungle.com', description:'user`s email who take new role'})
  @IsEmail({}, {message: 'must be a namber'})
  readonly userEmail: string;
}
