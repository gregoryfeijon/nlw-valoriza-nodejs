import { getCustomRepository } from "typeorm";
import { HTTP404Error } from "@exceptions/HTTP404Error";
import { ComplimentRepository } from "@repositories/ComplimentRepository";

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

        if (!compliments) {
            throw new HTTP404Error("No compliments found.");
        }

        return compliments;
    }
}

export { ListUserSendComplimentsService };