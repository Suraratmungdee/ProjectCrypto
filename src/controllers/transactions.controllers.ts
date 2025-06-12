import { Request, Response } from 'express';
import { Wallets, createWallets } from '../models/wallets.model';
import { createTransactions } from '../models/transactions.model';
import { AuthRequest } from '../middlewares/auth';

export const CreateTransactions = async (req: AuthRequest, res: Response) => {
    try {
        const user_id = req.user.user_id;
        const { from_id, to_id, currency_code, amount, transaction_type, external_address } = req.body;

        const wallet = await Wallets(user_id);

        res.status(201).json({wallet})
        // let from_wallet_id = null;
        // let to_wallet_id = null;
        // if (transaction_type === 'DEPOSIT') {
        //     to_wallet_id = user_id;
        // } else if (transaction_type === 'WITHDRAWAL') {
        //     from_wallet_id = user_id;
        // } else if (transaction_type === 'INTERNAL_TRANSFER') {
        //     from_wallet_id = user_id;
        //     to_wallet_id = to_id;
        // } else if (transaction_type === 'TRADE_PAYMENT') {

        // }

        // const params = {
        //     from_wallet_id,
        //     to_wallet_id,
        //     currency_code,
        //     amount,
        //     transaction_type,
        //     external_address
        // };

        

        // await createWallets(params);

        // res.status(201).json({ res_message: 'Wallets created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ res_message: 'Internal server error' });
        return;
    }
};
