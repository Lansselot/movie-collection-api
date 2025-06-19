import Boom from '@hapi/boom';
import { MovieFormat } from '../models/enums/movie-format.enum';
import { Movie } from '../models/movie.model';
import {
  CreateMovieDTO,
  MovieFiltersDTO,
  UpdateMovieDTO,
} from '../types/dto/movie.dto';
import { Op } from 'sequelize';

export class MovieService {
  public async createMovie(data: CreateMovieDTO): Promise<Movie> {
    return Movie.create(data);
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

    await movie.update(data);
    return movie;
  }

  public async getMovies(filters: MovieFiltersDTO): Promise<Movie[]> {
    const { title, actor } = filters;

    const where: any = {};

    if (title) {
      where.title = { [Op.substring]: `${title}%` };
    }

    if (actor) {
      where.actors = { [Op.substring]: `%"${actor}%"` };
    }

    return Movie.findAll({ where, order: [['title', 'ASC']] });
  }

  public async getMovieById(movieId: string): Promise<Movie> {
    const movie = await Movie.findByPk(movieId);
    if (!movie) throw Boom.notFound('Movie not found');

    return movie;
  }
}
