import { ActorService } from './actor.service';
import { AuthService } from './auth.service';
import { MovieService } from './movie.service';
import { UserService } from './user.service';

export const userService = new UserService();
export const movieService = new MovieService();
export const authService = new AuthService();
export const actorService = new ActorService();
