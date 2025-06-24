import { checkSchema } from 'express-validator';
import { MovieFormat } from '../types/enums/movie-format.enum';
import { MovieSortField } from '../types/enums/movie-sort-format.enum';
import { SortOrder } from '../types/enums/sort-order.enum';

const actorsIsNotEmptyString = (arr: any) =>
  arr.every((el: any) => typeof el == 'string' && el.trim().length);

const maxYear = new Date().getFullYear();

export const createMovieValidator = checkSchema({
  title: {
    trim: true,
    isString: {
      errorMessage: 'Title must be string.',
    },
    notEmpty: {
      errorMessage: 'Title must not be empty.',
    },
  },
  year: {
    trim: true,
    notEmpty: {
      errorMessage: 'Year must not be empty.',
    },
    isInt: {
      options: { min: 1800, max: maxYear },
      errorMessage: 'Year must be valid.',
    },
  },
  format: {
    isIn: {
      options: [Object.values(MovieFormat)],
      errorMessage: `Format must be one of: ${Object.values(MovieFormat).join(
        ', '
      )}`,
    },
  },
  actors: {
    isArray: {
      options: { min: 1 },
      errorMessage: 'Actors must be not empty array.',
    },
    custom: {
      options: actorsIsNotEmptyString,
      errorMessage: 'Each actor must be not empty string.',
    },
  },
});

export const putMovieValidation = createMovieValidator;

export const patchMovieValidation = checkSchema({
  title: {
    optional: true,
    trim: true,
    isString: {
      errorMessage: 'Title must be string.',
    },
    notEmpty: {
      errorMessage: 'Title must not be empty.',
    },
  },
  year: {
    optional: true,
    trim: true,
    notEmpty: {
      errorMessage: 'Year must not be empty.',
    },
    isInt: {
      options: { min: 1800, max: maxYear },
      errorMessage: 'Year must be valid.',
    },
  },
  format: {
    optional: true,
    isIn: {
      options: [Object.values(MovieFormat)],
      errorMessage: `Format must be one of: ${Object.values(MovieFormat).join(
        ', '
      )}`,
    },
  },
  actors: {
    optional: true,
    isArray: {
      options: { min: 1 },
      errorMessage: 'Actors must be not empty array.',
    },
    custom: {
      options: actorsIsNotEmptyString,
      errorMessage: 'Each actor must be not empty string.',
    },
  },
});

export const movieIdParamValidator = checkSchema({
  movieId: {
    in: ['params'],
    isUUID: {
      errorMessage: 'Movie ID must be valid.',
    },
  },
});

export const movieQueryValidator = checkSchema({
  title: {
    in: ['query'],
    optional: true,
    trim: true,
    isString: {
      errorMessage: 'Title must be string.',
    },
    notEmpty: {
      errorMessage: 'Title must not be empty.',
    },
  },
  actor: {
    in: ['query'],
    optional: true,
    trim: true,
    notEmpty: {
      errorMessage: 'Actor must not be empty.',
    },
    isString: {
      errorMessage: 'Actor must be string.',
    },
  },
  sort: {
    in: ['query'],
    optional: true,
    isIn: {
      options: [Object.values(MovieSortField)],
      errorMessage: `Sort must be one of: ${Object.values(MovieSortField).join(
        ', '
      )}`,
    },
  },
  order: {
    in: ['query'],
    optional: true,
    isIn: {
      options: [Object.values(SortOrder)],
      errorMessage: `Order must be one of: ${Object.values(SortOrder).join(
        ', '
      )}`,
    },
  },
  limit: {
    in: ['query'],
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: 'Limit must be a non-negative integer.',
    },
    toInt: true,
  },
  offset: {
    in: ['query'],
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: 'Offset must be a non-negative integer.',
    },
    toInt: true,
  },
});

export const moviesFileValidator = checkSchema({
  moviesFile: {
    custom: {
      options: (value, { req }) =>
        req.file && req.file.mimetype == 'text/plain',

      errorMessage: 'Text file must be valid.',
    },
  },
});
