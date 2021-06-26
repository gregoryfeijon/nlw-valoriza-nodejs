import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { HTTP400Error } from "../exceptions/HTTP400Error";
import { UserRepository } from "../repositories/UserRepository";

interface IUserRequest {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class CreateUserService {

    async execute({ name, email, password, admin = false }: IUserRequest) {
        const userRepository = getCustomRepository(UserRepository);

        if (!email) {
            throw new HTTP400Error("Invalid email");
        }

        const userAlreadyExists = await userRepository.findOne({ email });

        if (userAlreadyExists) {
            throw new HTTP400Error("User already exists!");
        }

        const passwordHash = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: passwordHash,
            admin
        });

        await userRepository.save(user);

        return user;
    }
}

export { CreateUserService };