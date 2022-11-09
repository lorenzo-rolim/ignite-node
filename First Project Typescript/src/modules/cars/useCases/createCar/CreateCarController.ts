import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { CreateCarUseCase } from './CreateCarUseCase';

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data: ICreateCarDTO = req.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    try {
      const car = await createCarUseCase.execute(data);
      return res.status(201).json(car);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateCarController };
