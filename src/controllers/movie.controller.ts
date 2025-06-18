import { Request, Response, NextFunction } from 'express';
import { movieService } from '../services';
import Boom from '@hapi/boom';
import { CreateMovieDTO, UpdateMovieDTO } from '../types/movie.dto';

export class MovieController {
  async createMovie(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: CreateMovieDTO = req.body.data;

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
      const movieId = req.params.id;

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
      const movieId = req.params.id;
      const data: UpdateMovieDTO = req.body;

      const updatedMovie = await movieService.updateMovieById(movieId, data);

      res.json(updatedMovie);
    } catch (error) {
      next(error);
    }
  }

  async getAllMovies(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const movies = await movieService.getAllMovies();

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
      const movieId = req.params.id;

      const movie = await movieService.getMovieById(movieId);

      res.json(movie);
    } catch (error) {
      next(error);
    }
  }

  async getMovieByTitle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const movieTitle = req.query.title;
      if (typeof movieTitle !== 'string')
        throw Boom.badRequest('Invalid title');

      const movies = await movieService.getMoviesByTitle(movieTitle);

      res.json(movies);
    } catch (error) {
      next(error);
    }
  }

  async getMoviesByActor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const movieActor = req.query.actor;
      if (typeof movieActor !== 'string')
        throw Boom.badRequest('Invalid actor name');

      const movies = await movieService.getMoviesByActor(movieActor);

      res.json(movies);
    } catch (error) {
      next(error);
    }
  }
}
