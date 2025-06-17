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

  @AllowNull
  @Column
  name!: string;

  @AllowNull
  @Column
  email!: string;

  @AllowNull
  @Column
  passwordHash!: string;

  @BelongsToMany(() => Movie, () => UserMovie)
  movies!: Movie[];

  @CreatedAt
  creationDate!: Date;

  @UpdatedAt
  updatedOn!: Date;
}
