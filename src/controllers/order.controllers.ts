import { Request, Response } from 'express';
import { Order, matchedOrder, createOrder, updateOrder } from '../models/order.model';
import { Trade, createTrade } from '../models/trades.model';
import { Transactions, createTransactionsTradePayment } from '../models/transactions.model';
import { Wallets, Wallet } from '../models/wallets.model';
import { AuthRequest } from '../middlewares/auth';
import { OrderStatus, OrderType, CurrencyType, FiatCurrency, TransactionType, TransactionStatus } from '../models/enums';


export const CreateOrder = async (req: AuthRequest, res: Response) => {
    try {
        const user_id = req.user.user_id;
        const { order_type, currency_code, fiat_currency_code, amount_crypto, price_per_unit_fiat } = req.body;

        const order: Order = {
            user_id,
            order_type: order_type as OrderType,
            currency_code: currency_code as CurrencyType,
            fiat_currency_code: fiat_currency_code as FiatCurrency,
            amount_crypto,
            price_per_unit_fiat,
            status: OrderStatus.OPEN,
        };

        const to_currency = await Wallet(user_id, currency_code as CurrencyType);
        const from_fiat = await Wallet(user_id, fiat_currency_code as FiatCurrency);
        
        // เพิ่ม order
        await createOrder(order);

        // ค้นหาว่ามี order มั้ย
        const matched_order = await matchedOrder(order);
        if (matched_order.status !== "FILLED") {
            const trade: Trade = {
                user_id,
                buy_order_id: matched_order.order_type === 'BUY' ? matched_order.order_id : null,
                sell_order_id: matched_order.order_type === 'SELL' ? matched_order.order_id : null,
                amount_crypto,
                price_per_unit_fiat,
                total_fiat_amount: amount_crypto * price_per_unit_fiat
            };

            // เพิ่มการ trade
            await createTrade(trade);

            // อัพเดท order ที่ทำการ matched
            await updateOrder(matched_order.order_id, { amount_crypto: matched_order.amount_crypto, status: matched_order.status as OrderStatus });

            // หา wallets.to_wallet_id 
            const from_currency = await Wallet(matched_order.user_id, currency_code as CurrencyType);
            const to_fiat = await Wallet(matched_order.user_id, fiat_currency_code as FiatCurrency);
            
            // เพิ่ม transactions ว่ามีการโอนเหรียญ TRADE_PAYMENT from : user_id -> to : matched_order.user_id
            const transactionscurrency: Transactions = {
                from_wallet_id: from_currency,
                to_wallet_id: to_currency,
                currency_code: currency_code as CurrencyType,
                amount: amount_crypto,
                transaction_type: TransactionType.TRADE_PAYMENT,
                status: TransactionStatus.SUCCESS,
            }
            await createTransactionsTradePayment(transactionscurrency);

            const transactionsfiat: Transactions = {
                from_wallet_id: from_fiat,
                to_wallet_id: to_fiat,
                currency_code: currency_code as CurrencyType,
                amount: amount_crypto * price_per_unit_fiat,
                transaction_type: TransactionType.TRADE_PAYMENT,
                status: TransactionStatus.SUCCESS,
            }
            await createTransactionsTradePayment(transactionsfiat);

            res.status(201).json({ res_message: 'Trades created successfully' });
            return;
        }

        res.status(201).json({ res_message: 'created successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ res_message: 'Internal server error' });
        return;
    }
};
