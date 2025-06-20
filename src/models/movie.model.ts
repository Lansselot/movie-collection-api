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
import { Actor } from './actor.model';
import { MovieActor } from './movie-actor.model';

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

  @BelongsToMany(() => User, () => UserMovie)
  users!: User[];

  @BelongsToMany(() => Actor, () => MovieActor)
  actors!: Actor[];

  @CreatedAt
  creationDate!: Date;

  @UpdatedAt
  updatedOn!: Date;
}
