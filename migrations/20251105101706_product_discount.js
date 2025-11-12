/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('product_discounts', function(table) {
    table.increments('id').primary();
    table.integer('product_id')
    .unsigned()
    .references('id')
    .inTable('products')
    .onDelete('CASCADE');


    table.decimal('discount_percentage', 10, 2).notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
  return knex.schema.dropTable('product_discounts');
};

exports.config = { transaction: false    };
