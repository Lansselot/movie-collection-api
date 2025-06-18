import Boom from '@hapi/boom';
import { Movie } from '../models/movie.model';
import { User } from '../models/user.model';
import { CreateUserDTO, UpdateUserDTO } from '../types/user.dto';

export class UserService {
  public async createUser(data: CreateUserDTO): Promise<User> {
    return User.create(data);
  }

  public async deleteUser(userId: string): Promise<{ success: true }> {
    const rowsDeleted = await User.destroy({ where: { id: userId } });
    if (!rowsDeleted) throw Boom.notFound('User not found');

    return { success: true };
  }

  public async updateUser(userId: string, data: UpdateUserDTO): Promise<User> {
    const user = await User.findByPk(userId);
    if (!user) throw Boom.notFound('User not found');

    await user.update(data);
    return user;
  }

  public async getUserById(userId: string): Promise<User> {
    const user = await User.findByPk(userId);
    if (!user) throw Boom.notFound('User not found');

    return user;
  }

  public async addMovieToUser(
    userId: string,
    movieId: string
  ): Promise<{ success: true }> {
    const user = await User.findByPk(userId);
    if (!user) throw Boom.notFound('User not found');

    const movie = await Movie.findByPk(movieId);
    if (!movie) throw Boom.notFound('Movie not found');

    const hasMovie = await user.$has('movies', movie);
    if (hasMovie) throw Boom.conflict('Movie already added to user');

    await user.$add('movies', movie);
    return { success: true };
  }

  public async removeMovieFromUser(
    userId: string,
    movieId: string
  ): Promise<{ success: true }> {
    const user = await User.findByPk(userId);
    if (!user) throw Boom.notFound('User not found');

    const movie = await Movie.findByPk(movieId);
    if (!movie) throw Boom.notFound('Movie not found');

    const hasMovie = await user.$has('movies', movie);
    if (!hasMovie) throw Boom.conflict('Movie not assigned to user');

    await user.$remove('movies', movie);
    return { success: true };
  }

  public async getUserMovies(userId: string): Promise<Movie[]> {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Movie,
          order: [['UserMovies', 'createdAt', 'ASC']],
        },
      ],
    });

    if (!user) throw Boom.notFound('User not found');

    return user.movies;
  }
}
