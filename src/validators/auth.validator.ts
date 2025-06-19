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
    isEmail: {
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
  },
});

export const loginValidator = checkSchema({
  email: {
    notEmpty: {
      errorMessage: 'Email must not be empty.',
    },
    isEmail: {
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
  },
});
