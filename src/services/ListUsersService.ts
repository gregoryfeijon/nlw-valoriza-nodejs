import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { classToPlain } from "class-transformer";
import { HTTP404Error } from "../exceptions/HTTP404Error";


class ListUsersService {

    async execute() {
        const userRepository = getCustomRepository(UserRepository);

        const users = await userRepository.find();

        if (!users) {
            throw new HTTP404Error("No users found.");
        }

        return classToPlain(users);
    }
}

export { ListUsersService };