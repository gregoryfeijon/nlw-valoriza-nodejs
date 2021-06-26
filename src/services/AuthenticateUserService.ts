import { getCustomRepository } from "typeorm";
import { HTTP400Error } from "../exceptions/HTTP400Error";
import { UserRepository } from "../repositories/UserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateUserRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthenticateUserRequest) {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({
            email
        });

        if (!user) {
            throw new HTTP400Error("Email/Password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new HTTP400Error("Email/Password incorrect");
        }

        const token = sign({
            email: user.email
        }, "eb3df084201994c2d9f7724f989d00d7", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export { AuthenticateUserService };