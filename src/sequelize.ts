import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';
import { Movie } from './models/movie.model';
import { UserMovie } from './models/user-movie.model';
import dotenv from 'dotenv';
import { Dialect } from 'sequelize';
import { MovieActor } from './models/movie-actor.model';
import { Actor } from './models/actor.model';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect,
  storage: process.env.DB_STORAGE,
  models: [User, Movie, UserMovie, Actor, MovieActor],
});
