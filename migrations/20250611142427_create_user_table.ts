import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable('user');
    if (!exists) {
        await knex.schema.createTable('user', (table) => {
            table.increments('user_id').unsigned().primary();
            table.string('username', 50).notNullable();
            table.string('email', 100).notNullable();
            table.string('password', 255).notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('user');
}

