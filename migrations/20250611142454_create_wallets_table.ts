import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("wallets", (table) => {
        table.increments("wallet_id").primary();
        table.integer("user_id").unsigned().references("user.user_id").onDelete("CASCADE");
        table.enu("currency_code", ["BTC", "ETH", "XRP", "DOGE", "THB", "USD"]).notNullable();
        table.decimal("balance", 30, 10).defaultTo(0);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("wallets");
}
