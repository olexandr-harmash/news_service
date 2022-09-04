import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingsDto {
  @ApiProperty({ example: '15', description: 'user`s id who posting rating' })
  readonly userId: number;
  @ApiProperty({ example: '57', description: 'news`id' })
  readonly newsId: number;
  @ApiProperty({ example: '4', description: 'rating 0-5' })
  readonly rating: number;
}
