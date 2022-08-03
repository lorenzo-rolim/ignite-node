import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { file } = req;

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

        try {
            await importCategoryUseCase.execute(file);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(201).send();
    }
}

export { ImportCategoryController };
