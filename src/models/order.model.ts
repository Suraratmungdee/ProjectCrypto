import db from '../connect/db';
import { OrderType, CurrencyType, FiatCurrency, OrderStatus } from './enums';

export interface Order {
    order_id?: number;
    user_id: number;
    order_type: OrderType;
    currency_code: CurrencyType;
    fiat_currency_code: FiatCurrency;
    amount_crypto: number;
    price_per_unit_fiat: number;
    status?: OrderStatus;
    created_at?: Date;
    updated_at?: Date;
}

interface MatchedOrderParams {
    order_type: OrderType;
    user_id: number;
    currency_code: CurrencyType;
    fiat_currency_code: FiatCurrency;
    amount_crypto: number;
    price_per_unit_fiat: number;
}

export const matchedOrder = async (params: MatchedOrderParams) => {
    const {
        order_type,
        user_id,
        currency_code,
        fiat_currency_code,
        amount_crypto,
        price_per_unit_fiat,
    } = params;

    const oppositeOrderType = order_type === 'BUY' ? 'SELL' : 'BUY';

    const query = db('orders')
        .where('order_type', oppositeOrderType)
        .where('currency_code', currency_code)
        .where('fiat_currency_code', fiat_currency_code)
        .whereNot('user_id', user_id);

    if (order_type === 'BUY') {
        query.andWhere('price_per_unit_fiat', '<=', price_per_unit_fiat)
            .orderBy('price_per_unit_fiat', 'asc');
    } else {
        query.andWhere('price_per_unit_fiat', '>=', price_per_unit_fiat)
            .orderBy('price_per_unit_fiat', 'desc');
    }

    const data = await query.first();
    const remaining = data.amount_crypto - amount_crypto;
    const result = {
        order_id: data.order_id,
        user_id: data.user_id,
        order_type: data.order_type,
        currency_code: data.currency_code,
        fiat_currency_code: data.fiat_currency_code,
        amount_crypto: remaining,
        price_per_unit_fiat: data.price_per_unit_fiat,
        status: remaining === 0 ? 'FILLED' : remaining < 0 ? 'FILLED' : 'PARTIALLY_FILLED',
    }
    return result;
};

export const createOrder = async (order: Order) => {
    const [order_id] = await db('orders').insert(order);
    return order_id;
};

export const updateOrder = async (orderId: number, updateFields: Partial<Order>) => {
    const updated = await db('orders')
        .where('order_id', orderId)
        .update({
            ...updateFields,
            updated_at: new Date(),
        });

    return updated;
};


