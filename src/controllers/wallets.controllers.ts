import { Request, Response } from 'express';
import { createWallets, listWallets } from '../models/wallets.model';
import { AuthRequest } from '../middlewares/auth';

export const ListWallets = async (req: AuthRequest, res: Response) => {
    try {
        const user_id = req.user.user_id;

        const res_result = await listWallets(user_id);

        res.status(201).json({ res_message: 'successfully', res_result: res_result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ res_message: 'Internal server error' });
        return;
    }
};

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

        res.status(201).json({ res_message: 'created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ res_message: 'Internal server error' });
        return;
    }
};
