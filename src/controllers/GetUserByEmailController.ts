import { Request, Response } from "express";
import { GetUserByEmailService } from "../services/GetUserByEmailService";

class GetUserByEmailController {

    async handle(req: Request, res: Response) {
        const { email } = req.body;

        const getUserByEmailService = new GetUserByEmailService();

        const user = await getUserByEmailService.execute(email);

        return res.json(user);
    }
}

export { GetUserByEmailController };