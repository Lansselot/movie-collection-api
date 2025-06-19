import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (Boom.isBoom(err)) {
    res
      .status(err.output.statusCode)
      .json({ error: err.message, data: err.data });
    return;
  }

  res.status(500).json({ error: 'Internal Server Error ' });
}
