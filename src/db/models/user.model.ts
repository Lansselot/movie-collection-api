import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
  Default,
  DataType,
  Unique,
  NotEmpty,
  IsEmail,
} from 'sequelize-typescript';
import { Movie } from './movie.model';
import { UUIDV4 } from 'sequelize';

@Table({ modelName: 'Users' })
export class User extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @NotEmpty
  @Column
  name!: string;

  @NotEmpty
  @IsEmail
  @Unique
  @Column
  email!: string;

  @NotEmpty
  @Column
  passwordHash!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
