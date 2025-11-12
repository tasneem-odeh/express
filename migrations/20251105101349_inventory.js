/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('inventories', function(table) {
    table.increments('id').primary();
    table.integer('product_id').notNullable();
    table.integer('quantity').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
  return knex.schema.dropTable('inventories');
};

exports.config = { transaction: false };
