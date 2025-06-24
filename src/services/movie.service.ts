import Boom from '@hapi/boom';
import { Movie } from '../db/models/movie.model';
import {
  CreateMovieDTO,
  MovieFiltersDTO,
  UpdateMovieDTO,
} from '../types/dto/movie.dto';
import { Op, Sequelize } from 'sequelize';
import { MovieSortField } from '../types/enums/movie-sort-format.enum';
import { SortOrder } from '../types/enums/sort-order.enum';
import { Actor } from '../db/models/actor.model';
import { actorService } from '.';
import { createMovieValidator } from '../validators/movie.validator';
import { validationResult } from 'express-validator';
import fs from 'fs/promises';
import { sequelize } from '../sequelize';

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

    const result = await sequelize.transaction(async (t) => {
      const movie = await Movie.create(
        { title, year, format },
        { transaction: t }
      );

      const foundActors: Actor[] = [];
      for (const name of actors) {
        const actor = await actorService.getOrCreateByName(name, t);
        foundActors.push(actor);
      }

      await movie.$set('actors', foundActors, { transaction: t });

      return movie.id;
    });

    return this.getMovieById(result);
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
      limit,
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

    const movies = await Movie.findAll({
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

    if (sort === MovieSortField.TITLE) {
      const sortedMovies = movies.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        return order === SortOrder.ASC
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      });

      return sortedMovies;
    }

    return movies;
  }

  async getMovieById(movieId: string): Promise<Movie> {
    const movie = await Movie.findByPk(movieId, {
      include: [{ model: Actor, through: { attributes: [] } }],
    });
    if (!movie) throw Boom.notFound('Movie not found');

    return movie;
  }

  private namings: Record<string, keyof CreateMovieDTO> = {
    Title: 'title',
    'Release Year': 'year',
    Format: 'format',
    Stars: 'actors',
  };

  private async parseMovies(
    content: string
  ): Promise<{ movies: CreateMovieDTO[]; errors: Error[] }> {
    const movies: CreateMovieDTO[] = [];
    const errors: Error[] = [];
    const movieTexts = content.split('\n\n');

    for (const movieText of movieTexts) {
      const movie: Partial<CreateMovieDTO> = {};

      const rows = movieText.split('\n');
      for (const row of rows) {
        const splitRow = row.split(': ');
        if (splitRow.length < 2) continue;

        const key = this.namings[splitRow[0].trim()];
        if (!key) continue;

        let value;
        if (key == 'actors') value = splitRow[1].split(', ');
        else value = splitRow[1].trim();
        if (!value) continue;

        movie[key] = value as any;
      }

      if (
        !movie.title ||
        !movie.year ||
        !movie.format ||
        !movie.actors ||
        !movie.actors.length
      )
        continue;

      const movieObj = { body: movie };

      for (const validator of createMovieValidator) {
        await validator.run(movieObj);
      }
      const validationErrors = validationResult(movieObj);
      if (!validationErrors.isEmpty()) {
        errors.push(
          Boom.badRequest('Validation failed', {
            errors: validationErrors.array(),
          })
        );
        continue;
      }

      movies.push(movie as CreateMovieDTO);
    }

    return { movies, errors };
  }

  async importMoviesFromText(
    filepath: string
  ): Promise<{ imported: number; errors: Error[] }> {
    const content = await fs.readFile(filepath, 'utf-8');
    const errors: Error[] = [];

    const { movies: parsedMovies, errors: parsedErrors } =
      await this.parseMovies(content);

    errors.push(...parsedErrors);

    let imported = 0;

    for (const movie of parsedMovies) {
      try {
        await this.createMovie(movie);
        ++imported;
      } catch (error: any) {
        errors.push(error);
      }
    }

    return { imported, errors };
  }
}
