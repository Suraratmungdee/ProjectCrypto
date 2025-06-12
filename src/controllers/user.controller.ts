import { Request, Response } from 'express';
import { createUser } from '../models/user.model';
import bcrypt from 'bcryptjs';

export const CreateUsers = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ res_message: 'All fields are required' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const params = {
            username,
            email,
            password: hashedPassword,
        };

        await createUser(params);

        res.status(201).json({ res_message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ res_message: 'Internal server error' });
        return;
    }
};
