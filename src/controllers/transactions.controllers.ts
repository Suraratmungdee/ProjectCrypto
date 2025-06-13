import { Request, Response } from 'express';
import { Wallet, createWallets } from '../models/wallets.model';
import { Transactions, createTransactions } from '../models/transactions.model';
import { AuthRequest } from '../middlewares/auth';
import { OrderStatus, OrderType, CurrencyType, FiatCurrency, TransactionType, TransactionStatus } from '../models/enums';

export const CreateTransactions = async (req: AuthRequest, res: Response) => {
    try {
        const user_id = req.user.user_id;
        const { currency_code, amount, transaction_type, external_address } = req.body;

        const wallet = await Wallet(user_id, currency_code);

        let from_wallet_id = null;
        let to_wallet_id = null;
        if (transaction_type === 'DEPOSIT') {
            to_wallet_id = wallet;
        } else if (transaction_type === 'WITHDRAWAL') {
            from_wallet_id = wallet;
        }

        const transactions: Transactions = {
            from_wallet_id: from_wallet_id,
            to_wallet_id: to_wallet_id,
            currency_code: currency_code as CurrencyType,
            amount: amount,
            transaction_type: transaction_type as TransactionType,
            status: TransactionStatus.SUCCESS,
            external_address: external_address
        }

        await createTransactions(transactions);

        res.status(201).json({ res_message: 'created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ res_message: 'Internal server error' });
        return;
    }
};
