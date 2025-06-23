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
  NotEmpty,
} from 'sequelize-typescript';
import { Movie } from './movie.model';
import { UUIDV4 } from 'sequelize';
import { MovieActor } from './movie-actor.model';

@Table({ modelName: 'Actors' })
export class Actor extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @NotEmpty
  @Column
  name!: string;

  @BelongsToMany(() => Movie, () => MovieActor)
  movies!: Movie[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
