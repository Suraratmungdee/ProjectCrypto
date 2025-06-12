export enum CurrencyType {
    BTC = "BTC",
    ETH = "ETH",
    XRP = "XRP",
    DOGE = "DOGE",
    THB = "THB",
    USD = "USD",
}

export enum FiatCurrency{
    BTC = "BTC",
    ETH = "ETH",
    XRP = "XRP",
    DOGE = "DOGE",
    THB = "THB",
    USD = "USD",
}

export enum TransactionType {
    DEPOSIT = "DEPOSIT", // ฝากเงินหรือเหรียญเข้าระบบ
    WITHDRAWAL = "WITHDRAWAL", // ถอนเงินหรือเหรียญออกจากระบบ
    INTERNAL_TRANSFER = "INTERNAL_TRANSFER", // โอนภายในระบบระหว่าง Wallet ของผู้ใช้
    TRADE_PAYMENT = "TRADE_PAYMENT", // จ่ายเงินสำหรับเทรด
}

export enum OrderType {
    BUY = "BUY",
    SELL = "SELL",
}

export enum OrderStatus {
    OPEN = "OPEN",
    PARTIALLY_FILLED = "PARTIALLY_FILLED",
    COMPLETED = "FILLED",
    CANCELLED = "CANCELLED",
}

export enum TransactionStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
}
