import { Request, Response, NextFunction } from 'express';
import { movieService } from '../services';
import Boom from '@hapi/boom';
import {
  CreateMovieDTO,
  MovieFiltersDTO,
  UpdateMovieDTO,
} from '../types/dto/movie.dto';
import { MovieSortField } from '../models/enums/movie-sort-format.enum';
import { SortOrder } from '../models/enums/sort-order.enum';
import fs from 'fs/promises';

export class MovieController {
  async createMovie(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: CreateMovieDTO = req.body;

      const newMovie = await movieService.createMovie(data);

      res.status(201).json(newMovie);
    } catch (error) {
      next(error);
    }
  }

  async deleteMovie(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const movieId = req.params.movieId;

      await movieService.deleteMovieById(movieId);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async updateMovie(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const movieId = req.params.movieId;
      const data: UpdateMovieDTO = req.body;

      const updatedMovie = await movieService.updateMovieById(movieId, data);

      res.json(updatedMovie);
    } catch (error) {
      next(error);
    }
  }

  async getMovies(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { title, actor, sort, order, limit, offset } = req.query;

      const filters: MovieFiltersDTO = {
        title: title as string,
        actor: actor as string,
        sort: sort as MovieSortField,
        order: order as SortOrder,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      };

      const movies = await movieService.getMovies(filters);

      res.json(movies);
    } catch (error) {
      next(error);
    }
  }

  async getMovieById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const movieId = req.params.movieId;

      const movie = await movieService.getMovieById(movieId);

      res.json(movie);
    } catch (error) {
      next(error);
    }
  }

  async importMoviesFromText(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.file) throw Boom.notFound('Movie not found');

      const result = await movieService.importMoviesFromText(req.file.path);

      await fs.unlink(req.file.path);

      res.json(result);
    } catch (error) {
      if (req.file?.path) {
        await fs.unlink(req.file.path);
      }
      next(error);
    }
  }

  async showUploadForm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.sendFile('upload.html', { root: 'src/views' });
    } catch (error) {
      next(error);
    }
  }
}
