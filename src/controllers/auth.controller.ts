import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User as getUserByUsername } from '../models/user.model';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ res_message: 'Username and password are required' });
        return;
    }

    const user = await getUserByUsername(username);

    if (!user) {
        res.status(404).json({ res_message: 'Invalid username or password' });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(401).json({ res_message: 'Invalid username or password' });
        return;
    }

    const payload = { user_id: user.user_id, username: user.username, email: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'default_secret', {
        // expiresIn: '1h',
    });

    res.json({ token });
};
