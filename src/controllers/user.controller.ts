import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';
import Boom from '@hapi/boom';
import { UpdateUserDTO } from '../types/dto/user.dto';

export class UserController {
  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenUserId = req.user?.userId;
      if (!tokenUserId) throw Boom.unauthorized();

      const user = await userService.getUserById(tokenUserId);

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;
      if (!tokenUserId) throw Boom.unauthorized();

      const data: UpdateUserDTO = req.body;

      const updatedUser = await userService.updateUserById(tokenUserId, data);

      res.json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;
      if (!tokenUserId) throw Boom.unauthorized();

      await userService.deleteUserById(tokenUserId);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async addMovie(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;
      const movieId = req.params.movieId;

      if (!tokenUserId) throw Boom.unauthorized();

      await userService.addMovieToUser(tokenUserId, movieId);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async removeMovie(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;
      const movieId = req.params.movieId;

      if (!tokenUserId) throw Boom.unauthorized();

      await userService.removeMovieFromUser(tokenUserId, movieId);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async getUserMovies(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;
      if (!tokenUserId) throw Boom.unauthorized();

      const movies = await userService.getUserMovies(tokenUserId);

      res.json(movies);
    } catch (error) {
      next(error);
    }
  }
}
