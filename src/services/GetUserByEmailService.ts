import { getCustomRepository } from "typeorm";
import { HTTP404Error } from "../exceptions/HTTP404Error";
import { UserRepository } from "../repositories/UserRepository";

class GetUserByEmailService {
    async execute(email: string) {
        const userRepository = getCustomRepository(UserRepository);
        
        const user = await userRepository.findOne({
            where: {
                email
            }
        });

        if (!user) {
            throw new HTTP404Error("User with specified email not found.");
        }

        return user;
    }
}

export { GetUserByEmailService };