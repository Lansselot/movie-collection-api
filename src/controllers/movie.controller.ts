import { Request, Response, NextFunction } from 'express';
import { movieService } from '../services';
import Boom from '@hapi/boom';
import {
  CreateMovieDTO,
  MovieFiltersDTO,
  UpdateMovieDTO,
} from '../types/dto/movie.dto';

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
      const filters: MovieFiltersDTO = {
        title:
          typeof req.query.title === 'string' ? req.query.title : undefined,
        actor:
          typeof req.query.actor === 'string' ? req.query.actor : undefined,
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
}
