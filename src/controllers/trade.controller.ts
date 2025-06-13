import { Request, Response } from 'express';
import { listTrade } from '../models/trades.model';
import { AuthRequest } from '../middlewares/auth';

export const ListTrade = async (req: AuthRequest, res: Response) => {
    try {
        const user_id = req.user.user_id;
        
        const res_result = await listTrade(user_id);

        res.status(200).json({ 
            res_message: 'successfully', 
            res_result: res_result 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ res_message: 'Internal server error' });
        return;
    }
};
