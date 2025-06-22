import Boom from '@hapi/boom';
import { Movie } from '../models/movie.model';
import {
  CreateMovieDTO,
  MovieFiltersDTO,
  UpdateMovieDTO,
} from '../types/dto/movie.dto';
import { Op, Sequelize } from 'sequelize';
import { MovieSortField } from '../models/enums/movie-sort-format.enum';
import { SortOrder } from '../models/enums/sort-order.enum';
import { Actor } from '../models/actor.model';
import { actorService } from '.';
import { createMovieValidator } from '../validators/movie.validator';
import { validationResult } from 'express-validator';

export class MovieService {
  async createMovie(data: CreateMovieDTO): Promise<Movie> {
    const { title, year, format, actors } = data;

    const existingMovie = await Movie.findOne({
      where: { title, year, format },
    });

    if (existingMovie) {
      throw Boom.conflict(
        'Movie with the same title, year and format already exists'
      );
    }

    const movie = await Movie.create({ title, year, format });

    const foundedActors: Actor[] = [];
    for (const name of actors) {
      const actor = await actorService.getOrCreateByName(name);
      foundedActors.push(actor);
    }

    await movie.$set('actors', foundedActors);

    return this.getMovieById(movie.id);
  }

  async deleteMovieById(movieId: string): Promise<{ success: true }> {
    const rowsDeleted = await Movie.destroy({ where: { id: movieId } });
    if (!rowsDeleted) throw Boom.notFound('Movie not found');

    return { success: true };
  }

  async updateMovieById(movieId: string, data: UpdateMovieDTO): Promise<Movie> {
    const movie = await Movie.findByPk(movieId);
    if (!movie) throw Boom.notFound('Movie not found');

    const { actors, ...movieData } = data;
    await movie.update(movieData);

    if (actors) {
      const foundedActors: Actor[] = [];
      for (const name of actors) {
        const actor = await actorService.getOrCreateByName(name);
        foundedActors.push(actor);
      }

      await movie.$set('actors', foundedActors);
    }

    return this.getMovieById(movie.id);
  }

  async getMovies(filters: MovieFiltersDTO): Promise<Movie[]> {
    const {
      title,
      actor,
      sort = MovieSortField.ID,
      order = SortOrder.ASC,
      limit = 100,
      offset = 0,
    } = filters;

    const where: any = {};
    const include: any = [];

    if (title) {
      where.title = { [Op.substring]: `${title}%` };
    }

    if (actor) {
      where.id = {
        [Op.in]: Sequelize.literal(`(
        SELECT movieId FROM MovieActors
        JOIN Actors ON Actors.id = MovieActors.actorId
        WHERE Actors.name LIKE '%${actor}%'
      )`),
      };
    }

    return Movie.findAll({
      where,
      include: [
        {
          model: Actor,
          through: { attributes: [] },
        },
      ],
      order: [[sort, order]],
      limit,
      offset,
    });
  }

  async getMovieById(movieId: string): Promise<Movie> {
    const movie = await Movie.findByPk(movieId, {
      include: [{ model: Actor, through: { attributes: [] } }],
    });
    if (!movie) throw Boom.notFound('Movie not found');

    return movie;
  }
}
