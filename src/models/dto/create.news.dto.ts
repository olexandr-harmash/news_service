import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({ example: 'about USA', description: 'news title' })
  readonly title: string;
  @ApiProperty({ example: 'something about enimals', description: 'news content' })
  readonly content: string;
  @ApiProperty({ example: '15', description: 'user`s id who posting news' })
  readonly userId: number;
}
