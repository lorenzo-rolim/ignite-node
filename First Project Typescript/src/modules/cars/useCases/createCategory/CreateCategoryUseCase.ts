import { inject, injectable } from "tsyringe";

import { ICategoryRepositories } from "../../repositories/ICategoryRepositories";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoryRepositories")
        private categoriesRepository: ICategoryRepositories
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const alreadyExistName = await this.categoriesRepository.findByName(name);

        if (alreadyExistName) {
            throw new Error("Category already exist!");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
