import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";

class ListUserSendComplimentsService {

    async execute(user_id: string) {
        const complimentRepository = getCustomRepository(ComplimentRepository);

        const compliments = await complimentRepository.find({
            where: {
                user_sender: user_id
            },
            //trás também os objetos relacionais
            relations: ['userSender', 'userReceiver', 'tag'],
        }
        );

        return compliments;
    }
}

export { ListUserSendComplimentsService };