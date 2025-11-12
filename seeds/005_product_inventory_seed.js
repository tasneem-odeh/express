/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker'); 

exports.seed = async function(knex) {
  // Deletes ALL existing entries
 // await knex('').del()
 const product_ids = await get_product_ids(knex);
 const inventory_ids = await get_inventory_ids(knex);

 const productInventory = [];
  for (let i = 0; i < 15; i++) {
    productInventory.push({
      product_id: faker.helpers.arrayElement(product_ids),
      inventory_id: faker.helpers.arrayElement(inventory_ids),
    });
  }

  await knex('product_inventories').insert(productInventory);

 };




 /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
async function get_product_ids(knex) {
  const products = await knex.select('id').from('products');
  return products.map(p => p.id);
}

/**
 * @param { import("knex").Knex } knex
 *  @returns { Promise<void> } 
 */
async function get_inventory_ids(knex) {
  const inventories = await knex.select('id').from('inventories');
  return inventories.map(i => i.id);
}