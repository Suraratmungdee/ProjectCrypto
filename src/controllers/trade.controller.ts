import { Request, Response } from 'express';
import { Trade, createTrade } from '../models/trades.model';
import { AuthRequest } from '../middlewares/auth';

export const CreateTrade = async (req: AuthRequest, res: Response) => {
    try {
        const user_id = req.user.user_id;
        const { order_type, order_id, amount_crypto, price_per_unit_fiat, total_fiat_amount } = req.body;

        const trade: Trade = {
            buy_order_id: order_type === 'BUY' ? order_id : null,
            sell_order_id: order_type === 'SELL' ? order_id : null,
            amount_crypto,
            price_per_unit_fiat,
            total_fiat_amount: amount_crypto * price_per_unit_fiat
        };

        // await createTrade(trade);

        res.status(201).json({ trade: trade, res_message: 'Orders created successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ res_message: 'Internal server error' });
        return;
    }
};
