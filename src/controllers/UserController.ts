import { Request, Response } from 'express';
import { User } from '../models/User';

class UserController {
    public async register(req: Request, res: Response) {
        const { email, password, firstName, lastName } = req.body;
        const user = new User({ email, password, firstName, lastName });
        try {
            await user.save();
            res.status(201).send({
                message: 'User created successfully',
                user,
            });
        } catch (error) {
            res.status(400).send({
                message: 'Error creating user',
                error,
            });
        }
    }
}