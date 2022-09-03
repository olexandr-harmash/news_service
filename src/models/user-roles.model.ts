import {Model, Table, Column, DataType, ForeignKey} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import { User } from './users.model';
import { Role } from './roles.model';

@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model <UserRoles> {
  @ApiProperty({example:'1', description:'unique identif'})
    @Column({
      type: DataType.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey:true
    })
    id: number;

  @ForeignKey(()=>Role)
  @ApiProperty({example:'32131231', description:'role id'})
    @Column({
      type: DataType.INTEGER
    })
    roleId: string;

    @ForeignKey(()=>User)
  @ApiProperty({example:'321332423', description:'user id'})
    @Column({
      type: DataType.INTEGER
    })
    userId: string;
}
