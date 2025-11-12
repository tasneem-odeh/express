/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
    table.increments('id');
    table.string('name').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.integer('quantity').notNullable();
    table.integer('category_id')
    .unsigned()
    .references('id')
    .inTable('categories')
    .onDelete('SET NULL');

    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};

exports.config = { transaction: false };