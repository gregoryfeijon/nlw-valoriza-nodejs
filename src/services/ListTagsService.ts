import { getCustomRepository } from "typeorm";
import { TagRepository } from "../repositories/TagRepository";
import { classToPlain } from "class-transformer";


class ListTagsService {

    async execute() {
        const tagRepository = getCustomRepository(TagRepository);

        const tags = await tagRepository.find();

        return classToPlain(tags);
    }
}

export { ListTagsService };