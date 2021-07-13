import { getCustomRepository } from "typeorm";
import { HTTP400Error } from "@exceptions/HTTP400Error";
import { TagRepository } from "@repositories/TagRepository";

interface ITagRequest {
    name: string;
}

class CreateTagService {

    async execute({ name }: ITagRequest) {
        const tagRepository = getCustomRepository(TagRepository);

        if (!name) {
            throw new HTTP400Error("Invalid name");
        }

        const tagAlreadyExists = await tagRepository.findOne({
            name
        });

        if (tagAlreadyExists) {
            throw new HTTP400Error("Tag already exists");
        }

        const tag = tagRepository.create({
            name
        });

        await tagRepository.save(tag);

        return tag;
    }
}

export { CreateTagService };