import { NextFunction, Request, Response } from 'express';

import { UserRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;

  const userRepository = new UserRepository();

  const user = await userRepository.findById(id);

  if (!user.isAdmin) {
    response.status(400).json({ message: "User isn't admin!'" });
  }

  return next();
}
