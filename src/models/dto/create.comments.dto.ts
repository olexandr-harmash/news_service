import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentsDto {
  @ApiProperty({ example: 'harmash.alex@gmail.com', description: 'user email' })
  readonly userId: number;
  @ApiProperty({ example: 'DA@hada$)+kk2djal3', description: 'user password' })
  readonly newsId: number;
  @ApiProperty({ example: 'DA@hada$)+kk2djal3', description: 'user password' })
  readonly comment: string;
}
