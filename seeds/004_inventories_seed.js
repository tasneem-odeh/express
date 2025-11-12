/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker } = require('@faker-js/faker'); 

exports.seed = async function(knex) {
  
  // await knex('inventories').del()

const product_ids=await get_products_ids(knex);

const inventories = [];
for (let i = 0; i < 10; i++) {
  inventories.push({
    product_id:faker.helpers.arrayElement(product_ids), 
    quantity: faker.number.int({ min: 0, max: 100 }),
  });
}

await knex('inventories').insert(inventories);

 };

 /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<number[]> }
 */
async function  get_products_ids(knex){
  const products=await knex.select('id').from('products');
   return products.map(product=>product.id);
}