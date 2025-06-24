import { checkSchema } from 'express-validator';
import { SortOrder } from '../types/enums/sort-order.enum';
import { ActorSortField } from '../types/enums/actor-sort-format.enum';

export const createActorValidator = checkSchema({
  name: {
    trim: true,
    isString: {
      errorMessage: 'Name must be string.',
    },
    notEmpty: {
      errorMessage: 'Name must not be empty.',
    },
    matches: {
      options: [/^[\p{L}\s\-,.]+$/gu],
      errorMessage:
        'Name must contain only letters, spaces and special characters (- , .)',
    },
  },
});

export const putActorValidation = createActorValidator;

export const patchActorValidation = checkSchema({
  name: {
    optional: true,
    trim: true,
    isString: {
      errorMessage: 'Name must be string.',
    },
    notEmpty: {
      errorMessage: 'Name must not be empty.',
    },
    matches: {
      options: [/^[\p{L}\s\-,.]+$/gu],
      errorMessage:
        'Name must contain only letters, spaces and special characters (- , .)',
    },
  },
});

export const actorIdParamValidator = checkSchema({
  actorId: {
    in: ['params'],
    isUUID: {
      errorMessage: 'Actor ID must be valid.',
    },
  },
});

export const actorQueryValidator = checkSchema({
  name: {
    in: ['query'],
    optional: true,
    trim: true,
    isString: {
      errorMessage: 'Name must be string.',
    },
    notEmpty: {
      errorMessage: 'Name must not be empty.',
    },
  },
  sort: {
    in: ['query'],
    optional: true,
    isIn: {
      options: [Object.values(ActorSortField)],
      errorMessage: `Sort must be one of: ${Object.values(ActorSortField).join(
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
