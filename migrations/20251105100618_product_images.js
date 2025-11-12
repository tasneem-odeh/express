/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('product_images', function(table) {
    table.increments('id').primary();
    table.string('image_url').notNullable();
    table.integer('product_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('products')
    .onDelete('CASCADE');

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
  return knex.schema.dropTable('product_images');
};

exports.config = { transaction: false };
