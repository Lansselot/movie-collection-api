import Boom from '@hapi/boom';
import { Movie } from '../db/models/movie.model';
import { User } from '../db/models/user.model';
import { CreateUserDTO, UpdateUserDTO } from '../types/dto/user.dto';
import bcrypt from 'bcryptjs';

export class UserService {
  async createUser(data: CreateUserDTO): Promise<User> {
    const { name, email, password } = data;

    const existingUser = await this.getUserByEmail(email);
    if (existingUser)
      throw Boom.conflict('User with this email already exists');

    const passwordHash = await bcrypt.hash(password, 10);

    return User.create({ name, email, passwordHash });
  }

  async deleteUserById(userId: string): Promise<{ success: true }> {
    const rowsDeleted = await User.destroy({ where: { id: userId } });
    if (!rowsDeleted) throw Boom.notFound('User not found');

    return { success: true };
  }

  async updateUserById(userId: string, data: UpdateUserDTO): Promise<User> {
    const user = await User.findByPk(userId);
    if (!user) throw Boom.notFound('User not found');

    if (data.email) {
      const existingUser = await this.getUserByEmail(data.email);
      if (existingUser && existingUser.id != userId)
        throw Boom.conflict('User with this email already exists');
    }

    await user.update(data);
    return user;
  }

  async getUserById(userId: string): Promise<User> {
    const user = await User.findByPk(userId);
    if (!user) throw Boom.notFound('User not found');

    return user;
  }

  async getUserByEmail(userEmail: string): Promise<User | null> {
    const user = await User.findOne({
      where: { email: userEmail },
    });

    return user;
  }

  async addMovieToUser(
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

  async removeMovieFromUser(
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
}
