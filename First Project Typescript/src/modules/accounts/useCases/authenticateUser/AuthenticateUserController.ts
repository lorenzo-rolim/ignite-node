import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


class AuthenticateUserController {



    async handle(req: Request, res: Response): Promise<Response> {

        const { email, password } = req.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

        try {
            const token = await authenticateUserUseCase.execute({ email, password });

            return res.json(token);
        } catch (err) {
            return res.status(400).json({ err: err.message });
        }

    }

}

export { AuthenticateUserController };
