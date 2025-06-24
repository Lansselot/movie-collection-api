import { body, checkSchema, param } from 'express-validator';

export const putUserValidator = checkSchema({
  name: {
    trim: true,
    isString: {
      errorMessage: 'Name must be string.',
    },
    isLength: {
      options: { min: 2, max: 16 },
      errorMessage: 'Name must be between 2 and 16 characters long.',
    },
  },
  email: {
    notEmpty: {
      errorMessage: 'Email must not be empty.',
    },
    matches: {
      options: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g],
      errorMessage: 'Email must be valid.',
    },
  },
});

export const patchUserValidator = checkSchema({
  name: {
    optional: true,
    trim: true,
    isString: {
      errorMessage: 'Name must be string.',
    },
    isLength: {
      options: { min: 2, max: 16 },
      errorMessage: 'Name must be between 2 and 16 characters long.',
    },
  },
  email: {
    optional: true,
    notEmpty: {
      errorMessage: 'Email must not be empty.',
    },
    matches: {
      options: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g],
      errorMessage: 'Email must be valid.',
    },
  },
});
