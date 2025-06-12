import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("orders", (table) => {
        table.increments("order_id").primary();
        table.integer("user_id").unsigned().references("user.user_id").onDelete("CASCADE");
        table.enu("order_type", ["BUY", "SELL"]).notNullable();
        table.enu("currency_code", ["BTC", "ETH", "XRP", "DOGE", "THB", "USD"]).notNullable();
        table.enu("fiat_currency_code", ["BTC", "ETH", "XRP", "DOGE", "THB", "USD"]).notNullable();
        table.decimal("amount_crypto", 30, 10).notNullable();
        table.decimal("price_per_unit_fiat", 30, 10).notNullable();
        table.enu("status", ["OPEN", "PARTIALLY_FILLED", "FILLED", "CANCELLED"]).notNullable().defaultTo("OPEN");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("orders");
}
