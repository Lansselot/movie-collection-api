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
import { User } from './user.model';
import { Movie } from './movie.model';

@Table({ modelName: 'UserMovies' })
export class UserMovie extends Model {
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: string;

  @AllowNull(false)
  @ForeignKey(() => Movie)
  @Column(DataType.UUID)
  movieId!: string;
}
