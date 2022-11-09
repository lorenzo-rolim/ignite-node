import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(req: Request, res: Response) {
    const { brand, name, category_id } = req.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase,
    );

    try {
      const cars = await listAvailableCarsUseCase.execute({
        brand: brand as string,
        name: name as string,
        category_id: category_id as string,
      });

      return res.json(cars);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  }
}

export { ListAvailableCarsController };
