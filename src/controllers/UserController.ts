import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config/config';

const { env } = config;
class UserController {
    public async register(req: Request, res: Response) {
        const { email, password, name } = req.body;
        try {
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = await User.create({ email, password: passwordHash, name });
            res.status(201).send({ success: true, data: newUser });
        } catch (error) {
            console.log("🚀 ~ file: UserController.ts:19 ~ UserController ~ register ~ error:", error)
            res.status(500).send({success: false, message: 'Failed to create a user', error });
        }
    }
    
    public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const isUser = await User.findOne({ where: { email } });
        
        if (!isUser) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, isUser.password);
            
        if (!isPasswordCorrect) {
             return res.status(401).send({ success: false, message: 'Incorrect password' });
            }
        
        const token = jwt.sign(
            { _id: isUser?.id, email: isUser?.email },
            env.JWT_TOKEN_SECRET as string,
            {
              expiresIn: "1d",
            }
          );

        res.status(200).send({ success: true, data: {email, name: isUser.name}, token });
    } catch (error) {
        console.log('🚀 ~ file: UserController.ts:21 ~ UserController ~ login ~ error:', error)
        res.status(500).send({success: false, message: 'Failed to login a user', error });
    }
    }
}

export default new UserController();