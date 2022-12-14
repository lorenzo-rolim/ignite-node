import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


class CreateCategoryController {


    async handle(req: Request, res: Response) {
        const { name, description } = req.body;
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

        try {
            await createCategoryUseCase.execute({ name, description });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

        return res.status(201).send();
    }
}

export { CreateCategoryController };
