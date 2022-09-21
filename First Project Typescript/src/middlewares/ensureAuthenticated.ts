import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UserRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  email: string;
  name: string;
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ err: 'Missing token!' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, 'lorenzo') as IPayload;

    const usersRepository = new UserRepository();
    const user = await usersRepository.findById(sub);

    if (!user) {
      return res.status(400).json({ err: "User doesn't exist!" });
    }

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    return res.status(400).json({ err: 'Invalid token!' });
  }
}
