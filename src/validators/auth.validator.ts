import { checkSchema } from 'express-validator';

export const registerValidator = checkSchema({
  name: {
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
  password: {
    isString: {
      errorMessage: 'Password must be string.',
    },
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long.',
    },
    matches: {
      options: [/^[\d\w!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/],
      errorMessage:
        'Password must contain only letters (a-z), numbers (0-9) and special characters',
    },
  },
  confirmPassword: {
    notEmpty: {
      errorMessage: 'Confirm password must not be empty.',
    },
    custom: {
      options: (value, { req }) =>
        req.body.password && value === req.body.password,
      errorMessage: 'Passwords do not match.',
    },
  },
});

export const loginValidator = checkSchema({
  email: {
    notEmpty: {
      errorMessage: 'Email must not be empty.',
    },
    matches: {
      options: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g],
      errorMessage: 'Email must be valid.',
    },
  },
  password: {
    isString: {
      errorMessage: 'Password must be string.',
    },
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long.',
    },
    matches: {
      options: [/^[\d\w!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/],
      errorMessage:
        'Password must contain only letters (a-z), numbers (0-9) and special characters',
    },
  },
});
