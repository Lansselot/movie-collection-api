import {
  AllowNull,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { MovieFormat } from './enums/movie-format.enum';
import { User } from './user.model';
import { UUIDV4 } from 'sequelize';
import { UserMovie } from './user-movie.model';

@Table({ modelName: 'Movies' })
export class Movie extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @NotEmpty
  @Column
  title!: string;

  @AllowNull(false)
  @Column
  year!: number;

  @AllowNull(false)
  @Column({ type: DataType.ENUM(...Object.values(MovieFormat)) })
  format!: MovieFormat;

  @Column(DataType.JSON)
  actors!: string[];

  @BelongsToMany(() => User, () => UserMovie)
  users!: User[];

  @CreatedAt
  creationDate!: Date;

  @UpdatedAt
  updatedOn!: Date;
}
