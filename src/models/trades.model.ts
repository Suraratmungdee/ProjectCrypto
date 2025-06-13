import db from '../connect/db';

export interface Trade {
    user_id: number;
    buy_order_id: number;
    sell_order_id: string;
    amount_crypto: number;
    price_per_unit_fiat: number;
    total_fiat_amount: number;
}

export const listTrade = async (user_id: number) => {
    const data = await db('trades')
        .where('user_id', user_id)
    return data;
};

export const createTrade = async (trade: Trade) => {
    const [created] = await db('trades').insert(trade);
    return created;
};
