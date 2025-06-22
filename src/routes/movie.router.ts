import { Router } from 'express';
import { movieController } from '../controllers';
import {
  createMovieValidator,
  movieIdParamValidator,
  movieQueryValidator,
  moviesFileValidator,
  patchMovieValidation,
  putMovieValidation,
} from '../validators/movie.validator';
import { validate } from '../middleware/validate.middleware';
import multer from 'multer';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get(
  '/',
  movieQueryValidator,
  validate,
  authenticate,
  movieController.getMovies
);
router.post(
  '/',
  createMovieValidator,
  validate,
  authenticate,
  movieController.createMovie
);
router.get('/upload', movieController.showUploadForm);
router.post(
  '/upload',
  upload.single('moviesFile'),
  moviesFileValidator,
  validate,
  movieController.importMoviesFromText
);
router.get(
  '/:movieId',
  movieIdParamValidator,
  validate,
  authenticate,
  movieController.getMovieById
);
router.put(
  '/:movieId',
  movieIdParamValidator,
  putMovieValidation,
  validate,
  authenticate,
  movieController.updateMovie
);
router.patch(
  '/:movieId',
  movieIdParamValidator,
  patchMovieValidation,
  validate,
  authenticate,
  movieController.updateMovie
);
router.delete(
  '/:movieId',
  movieIdParamValidator,
  validate,
  authenticate,
  movieController.deleteMovie
);

export default router;
