import { Model, Table, Column, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './roles.model';
import { UserRoles } from './user-roles.model';
import {News} from './news.model';

interface UserCreatedAttr {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreatedAttr> {
  @ApiProperty({ example: '1', description: 'unique identif' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 'harmash.alex@gmail.com', description: 'user email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email: string;

  @ApiProperty({ example: 'Fjds3%$DFo202', description: 'user password' })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => News)
  news: News[];
}
