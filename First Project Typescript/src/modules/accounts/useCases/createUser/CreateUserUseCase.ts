import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {

        try {
            await this.usersRepository.create({ name, email, driver_license, password });
        } catch (err) {
            throw new Error(err.message);
        }
    }

}

export { CreateUserUseCase };
