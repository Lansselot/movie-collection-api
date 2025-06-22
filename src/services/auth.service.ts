import { userService } from '.';
import Boom from '@hapi/boom';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { AppJwtPayload } from '../types/jwt';
import dotenv from 'dotenv';

dotenv.config();

export class AuthService {
  async login(email: string, password: string): Promise<string> {
    const user = await userService.getUserByEmail(email);
    if (!user) throw Boom.unauthorized('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) throw Boom.unauthorized('Invalid email or password');

    const payload: AppJwtPayload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return token;
  }
}
