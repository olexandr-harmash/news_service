import {ApiProperty} from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, Length, IsEmail } from 'class-validator'

export enum Status {
  PENDING_APPROVAL = 'pending approval',
  PUBLISHED = 'published'
}

export class EditStatusParams {
  @ApiProperty({ example: '5', description: 'news`s id (params)' })
  id: number
  @ApiProperty({ example: 'pending', description: 'status published or pending approval (params)' })
  @IsEnum(Status)
  status: Status
}
