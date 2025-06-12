import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("transactions", (table) => {
        table.increments("transaction_id").primary();
        table.integer("from_wallet_id").unsigned().references("wallets.wallet_id").onDelete("CASCADE");
        table.integer("to_wallet_id").unsigned().references("wallets.wallet_id").onDelete("CASCADE");
        table.enu("currency_code", ["BTC", "ETH", "XRP", "DOGE", "THB", "USD"]).notNullable();
        table.decimal("amount", 30, 10).notNullable();
        table.enu("transaction_type", ["DEPOSIT", "WITHDRAWAL", "INTERNAL_TRANSFER", "TRADE_PAYMENT"]).notNullable();
        table.enu("status", ["PENDING", "SUCCESS", "FAILED"]).defaultTo("PENDING").notNullable();
        table.string("external_address", 255);
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("transactions");
}
