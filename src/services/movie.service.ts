import Boom from '@hapi/boom';
import { MovieFormat } from '../models/enums/movie-format.enum';
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

export class MovieService {
  public async createMovie(data: CreateMovieDTO): Promise<Movie> {
    const { actorIds, ...movieData } = data;

    console.log(`data = ${JSON.stringify(data)}`);

    const movie = await Movie.create(movieData);
    const actors = await Actor.findAll({
      where: { id: actorIds },
    });

    await movie.$set('actors', actors);

    return this.getMovieById(movie.id);
  }

  public async deleteMovieById(movieId: string): Promise<{ success: true }> {
    const rowsDeleted = await Movie.destroy({ where: { id: movieId } });
    if (!rowsDeleted) throw Boom.notFound('Movie not found');

    return { success: true };
  }

  public async updateMovieById(
    movieId: string,
    data: UpdateMovieDTO
  ): Promise<Movie> {
    const movie = await Movie.findByPk(movieId);
    if (!movie) throw Boom.notFound('Movie not found');

    const { actorIds, ...movieData } = data;
    await movie.update(movieData);

    if (actorIds) {
      const actors = await Actor.findAll({
        where: { id: { [Op.in]: actorIds } },
      });

      await movie.$set('actors', actors);
    }

    return this.getMovieById(movie.id);
  }

  public async getMovies(filters: MovieFiltersDTO): Promise<Movie[]> {
    const {
      title,
      actor,
      sort = MovieSortField.ID,
      order = SortOrder.ASC,
      limit = 10,
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

  public async getMovieById(movieId: string): Promise<Movie> {
    const movie = await Movie.findByPk(movieId, {
      include: [{ model: Actor, through: { attributes: [] } }],
    });
    if (!movie) throw Boom.notFound('Movie not found');

    return movie;
  }
}
