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

router.use(authenticate);

router.get('/me', userController.getUserById);
router.put('/me', putUserValidator, validate, userController.updateUser);
router.patch('/me', patchUserValidator, validate, userController.updateUser);
router.delete('/me', userController.deleteUser);
router.get('/movies', userController.getUserMovies);
router.post(
  'movies/:movieId',
  movieIdParamValidator,
  validate,
  userController.addMovie
);
router.delete(
  'movies/:movieId',
  movieIdParamValidator,
  validate,
  userController.removeMovie
);

export default router;
