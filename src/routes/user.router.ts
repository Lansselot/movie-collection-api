import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { userController } from '../controllers';
import {
  patchUserValidator,
  putUserValidator,
} from '../validators/user.validator';
import { validate } from '../middleware/validate.middleware';
import { movieIdParamValidator } from '../validators/movie.validator';

const router = Router();

router.get('/me', authenticate, userController.getUserById);
router.put(
  '/me',
  putUserValidator,
  validate,
  authenticate,
  userController.updateUser
);
router.patch(
  '/me',
  patchUserValidator,
  validate,
  authenticate,
  userController.updateUser
);
router.delete('/me', authenticate, userController.deleteUser);
router.get('/movies', authenticate, userController.getUserMovies);
router.post(
  'movies/:movieId',
  movieIdParamValidator,
  validate,
  authenticate,
  userController.addMovie
);
router.delete(
  'movies/:movieId',
  movieIdParamValidator,
  validate,
  authenticate,
  userController.removeMovie
);

export default router;
