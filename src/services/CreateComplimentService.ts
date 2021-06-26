import { getCustomRepository } from "typeorm";
import { HTTP400Error } from "../exceptions/HTTP400Error";
import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { UserRepository } from "../repositories/UserRepository";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {

    async execute({ tag_id,
        user_sender,
        user_receiver,
        message,
    }: IComplimentRequest) {
        const complimentRepository = getCustomRepository(ComplimentRepository);
        const userRepository = getCustomRepository(UserRepository);

        const userReceiverExists = await userRepository.findOne(user_receiver);

        if (user_sender === user_receiver) {
            throw new HTTP400Error("User Sender and User Receiver MUST be different!");
        }

        if (!userReceiverExists) {
            throw new HTTP400Error("User Receiver doesn't exists!");
        }

        const compliment = complimentRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        await complimentRepository.save(compliment);

        return compliment;
    }

}

export { CreateComplimentService };