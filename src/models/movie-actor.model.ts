import { UUIDV4 } from 'sequelize';
import {
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  AllowNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Actor } from './actor.model';
import { Movie } from './movie.model';

@Table({ modelName: 'MovieActors' })
export class MovieActor extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @ForeignKey(() => Movie)
  @Column(DataType.UUID)
  movieId!: string;

  @AllowNull(false)
  @ForeignKey(() => Actor)
  @Column(DataType.UUID)
  actorId!: string;
}
