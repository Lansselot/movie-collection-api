import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
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
import { UserMovie } from './user-movie.model';

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

  @BelongsToMany(() => Movie, () => UserMovie)
  movies!: Movie[];

  @CreatedAt
  creationDate!: Date;

  @UpdatedAt
  updatedOn!: Date;
}
