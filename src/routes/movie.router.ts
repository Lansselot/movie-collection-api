import { Router } from 'express';
import { movieController } from '../controllers';
import {
  createMovieValidator,
  movieIdParamValidator,
  movieQueryValidator,
  patchMovieValidation,
  putMovieValidation,
} from '../validators/movie.validator';
import { validate } from '../middleware/validate.middleware';

const router = Router();

router.get('/', movieQueryValidator, validate, movieController.getMovies);
router.post('/', createMovieValidator, validate, movieController.createMovie);
router.get(
  '/:movieId',
  movieIdParamValidator,
  validate,
  movieController.getMovieById
);
router.put(
  '/:movieId',
  movieIdParamValidator,
  putMovieValidation,
  validate,
  movieController.updateMovie
);
router.patch(
  '/:movieId',
  movieIdParamValidator,
  patchMovieValidation,
  validate,
  movieController.updateMovie
);
router.delete(
  '/:movieId',
  movieIdParamValidator,
  validate,
  movieController.deleteMovie
);

export default router;
