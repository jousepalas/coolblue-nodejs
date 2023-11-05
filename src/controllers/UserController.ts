import { Request, Response } from 'express';
import { User } from '../models/User';

class UserController {
    public async register(req: Request, res: Response) {
        const { email, password, name } = req.body;
        try {
            const newUser = await User.create({ email, password, name });
            res.status(201).send({ success: true, data: newUser });
        } catch (error) {
            res.status(400).send({success: false, message: 'Error creating user', error });
        }
    }
}

export default new UserController();