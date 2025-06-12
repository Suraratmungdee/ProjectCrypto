import { Request, Response } from 'express';
import { createWallets } from '../models/wallets.model';
import { AuthRequest } from '../middlewares/auth';

export const CreateWallets = async (req: AuthRequest, res: Response) => {
    try {
        const user_id = req.user.user_id;
        const { currency_code, balance } = req.body;

        const params = {
            user_id,
            currency_code,
            balance,
        };

        await createWallets(params);

        res.status(201).json({ res_message: 'Wallets created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ res_message: 'Internal server error' });
        return;
    }
};
