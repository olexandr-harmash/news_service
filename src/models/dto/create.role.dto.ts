import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../models/roles-values'
import { IsString, IsEnum, IsNumber, Length, IsEmail } from 'class-validator'

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'user`s role' })
  @IsString({ message: 'must be a string' })
  @IsEnum(UserRole)
  readonly value: string;
  @ApiProperty({ example: 'can added roles', description: 'info about role' })
  @IsString({ message: 'must be a string' })
  readonly description: string;
}
