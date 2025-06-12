import db from '../connect/db';
import { CurrencyType, TransactionType, TransactionStatus } from "./enums";
import { updateWalletsDecrement, updateWalletsIncrement1 }  from "./wallets.model";

export interface Transactions {
    from_wallet_id : number;
    to_wallet_id : number;
    currency_code: CurrencyType;
    amount: number;
    transaction_type: TransactionType;
    status: TransactionStatus;
    external_address?: string;
}

// export const createTransactions = async (transactions: Transactions) => {
//     const [created] = await db('transactions').insert(transactions);
//     return created;
// };

export const createTransactionsDeposit = async (transactions: Transactions) => {
    const [created] = await db('transactions').insert(transactions);
    return created;
};

export const createTransactionsWithdrawal = async (transactions: Transactions) => {
    const [created] = await db('transactions').insert(transactions);
    return created;
};

export const createTransactionsInternalTransfer = async (transactions: Transactions) => {
    const [created] = await db('transactions').insert(transactions);
    return created;
};

export const createTransactionsTradePayment = async (transactions: Transactions) => {  
    await updateWalletsDecrement(transactions.from_wallet_id, transactions.amount);
    await updateWalletsIncrement1(transactions.to_wallet_id, transactions.amount);
    const [created] = await db('transactions').insert(transactions);
    return created;
};