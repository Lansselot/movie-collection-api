import { NextFunction, Request, Response } from 'express';
import { authService, userService } from '../services';
import { CreateUserDTO } from '../types/dto/user.dto';

export class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body: CreateUserDTO = req.body;

      const newUser = await userService.createUser(body);
      res
        .status(201)
        .json({ id: newUser.id, name: newUser.name, email: newUser.email });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const token = await authService.login(email, password);

      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}
