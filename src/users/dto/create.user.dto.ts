import {ApiProperty} from '@nestjs/swagger';
import {IsString, Length, IsEmail} from 'class-validator'

export class CreateUserDto {
  @ApiProperty({example:'harmash.alex@gmail.com', description:'user email'})
  @IsString({message: 'must be string'})
  @IsEmail({}, {message: "bad email"})
  readonly email: string;

  @ApiProperty({example:'DA@hada$)+kk2djal3', description:'user password'})
  @IsString({message: 'must be string'})
  @Length(8, 16, {message: 'must be 8-16 symbols'})
  readonly password: string;
}
