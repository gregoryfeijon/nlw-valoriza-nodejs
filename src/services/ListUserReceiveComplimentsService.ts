import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";

interface IListUserReceiveRequest {
    compliments: []
}

class ListUserReceiveComplimentsService {

    async execute(user_id: string) {
        const complimentRepository = getCustomRepository(ComplimentRepository);

        const compliments = await complimentRepository.find({
            where: {
                user_receiver: user_id
            }
        }
        );

        return compliments;
    }
}

export { ListUserReceiveComplimentsService };