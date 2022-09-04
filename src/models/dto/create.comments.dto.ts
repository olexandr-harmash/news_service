import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentsDto {
  @ApiProperty({ example: '15', description: 'user`s id who posting comments' })
  readonly userId: number;
  @ApiProperty({ example: '15', description: 'news`s id that will include comments' })
  readonly newsId: number;
  @ApiProperty({example:'It was great!!!', description:'content'})
  readonly comment: string;
}
