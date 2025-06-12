import db from '../connect/db';
import { CurrencyType, FiatCurrency } from "./enums";

export interface Wallets {
    wallet_id?: number;
    user_id: number;
    currency_code: CurrencyType;
    balance: number;
    created_at?: Date;
    updated_at?: Date;
}

export const Wallet = async (user_id: number, currency_code: string) => {
    const data = await db('wallets')
        .select('wallet_id')
        .where('user_id', user_id)
        .where('currency_code', currency_code)
        .first();

    if (!data) {
        const wallets: Wallets = {
            user_id,
            currency_code: currency_code as CurrencyType,
            balance: 0
        };
        const wallet_id = await createWallets(wallets);
        return wallet_id;
    }

    return data.wallet_id;
}

export const createWallets = async (wallet: Wallets) => {
    const [wallet_id] = await db('wallets').insert(wallet);
    return wallet_id;
};

export const updateWalletsDecrement = async (wallet_id: number, balance: number) => {
    const updated = await db('wallets')
        .where('wallet_id', wallet_id)
        .update({
            updated_at: new Date(),
        })
        .decrement('balance', balance);

    return updated;
};

export const updateWalletsIncrement1 = async (wallet_id: number, balance: number) => {
    const updated = await db('wallets')
        .where('wallet_id', wallet_id)
        .update({
            updated_at: new Date(),
        })
        .increment('balance', balance);

    return updated;
};
