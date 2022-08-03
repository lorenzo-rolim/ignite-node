import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        function throwError() {
            throw new Error("Email or password incorrect!");
        }

        if (!user) {
            throwError();
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throwError();
        }

        const token = sign({ name: user.name, email: user.email }, "lorenzo", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email
            },
            token
        };

        return tokenReturn;
    }

}

export { AuthenticateUserUseCase };
