/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker'); 

exports.seed = async function(knex) {

  const category_ids = await get_category_ids(knex);

  const products = [];
  for (let i = 0; i < 500; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: faker.commerce.price({ min: 5, max: 300, dec: 2 }),
      quantity: faker.number.int({ min: 0, max: 100 }),
      category_id: faker.helpers.arrayElement(category_ids),

});
  }

  await knex('products').insert(products);

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<number[]> }
 */

async function get_category_ids(knex){
  const categories = await knex.select('id').from('categories');
return categories.map(c => c.id);
}