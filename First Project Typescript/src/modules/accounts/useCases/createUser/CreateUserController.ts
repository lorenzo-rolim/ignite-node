import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";


class CreateUserController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { body } = req;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        try {
            await createUserUseCase.execute(body);
        } catch (err) {
            return res.status(400).json({ err: err.message });
        }

        return res.status(201).send();

    }

}

export { CreateUserController };
