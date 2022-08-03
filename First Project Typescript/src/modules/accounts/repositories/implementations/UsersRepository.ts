import { hash } from "bcryptjs";
import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UserRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.findByEmail(email);

        if (userAlreadyExists) {
            throw new Error("Email already exists!");
        }

        const passwordHash = await hash(password, 8);

        const user = this.repository.create({
            name,
            email,
            driver_license,
            password: passwordHash,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });

        return user;
    }
}

export { UserRepository };
