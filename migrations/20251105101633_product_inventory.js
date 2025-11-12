/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('product_inventories', function(table) {
    table.increments('id').primary();
    table.integer('product_id')
    .unsigned()
    .references('id')
    .inTable('products')
    .onDelete('CASCADE') ;

    table.integer('inventory_id')
    .unsigned()
    .references('id')
    .inTable('inventories')
    .onDelete('CASCADE');


    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
  return knex.schema.dropTable('product_inventories');
};

exports.config = { transaction: false };
