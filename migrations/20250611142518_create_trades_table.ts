import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("trades", (table) => {
        table.increments("trade_id").primary();
        table.integer("user_id").unsigned().references("user.user_id").onDelete("CASCADE");
        table.integer("buy_order_id").unsigned().references("orders.order_id").onDelete("CASCADE");
        table.integer("sell_order_id").unsigned().references("orders.order_id").onDelete("CASCADE");
        table.decimal("amount_crypto", 30, 10).notNullable();
        table.decimal("price_per_unit_fiat", 30, 10).notNullable();
        table.decimal("total_fiat_amount", 30, 10).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("trades");
}
