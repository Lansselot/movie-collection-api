import { Sequelize } from 'sequelize-typescript';
import { User } from './db/models/user.model';
import { Movie } from './db/models/movie.model';
import dotenv from 'dotenv';
import { Dialect } from 'sequelize';
import { MovieActor } from './db/models/movie-actor.model';
import { Actor } from './db/models/actor.model';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect,
  storage: process.env.DB_STORAGE,
  models: [User, Movie, Actor, MovieActor],
});
