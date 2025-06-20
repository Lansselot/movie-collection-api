import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { MovieController } from './movie.controller';
import { ActorController } from './actor.controller';

export const userController = new UserController();
export const authController = new AuthController();
export const movieController = new MovieController();
export const actorController = new ActorController();
