import { getCustomRepository } from "typeorm";
import { TagRepository } from "@repositories/TagRepository";
import { classToPlain } from "class-transformer";
import { HTTP404Error } from "@exceptions/HTTP404Error";


class ListTagsService {

    async execute() {
        const tagRepository = getCustomRepository(TagRepository);

        const tags = await tagRepository.find();

        if (!tags) {
            throw new HTTP404Error("No tags found.");
        }

        return classToPlain(tags);
    }
}

export { ListTagsService };