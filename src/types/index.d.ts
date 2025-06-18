import { AppJwtPayload } from './jwt';

declare global {
  namespace Express {
    interface Request {
      user?: AppJwtPayload;
    }
  }
}
