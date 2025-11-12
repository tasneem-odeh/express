/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker'); 

exports.seed = async function(knex) {
    // أولاً نجيب كل ال product ids
    const product_ids = await get_product_ids(knex);
  
    const discounts = [];
    for (const productId of product_ids) {
      discounts.push({
        product_id: productId,
        discount_percentage: faker.number.int({ min: 5, max: 50 }),
      });
    }
  
    await knex('product_discounts').insert(discounts);
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<number[]> }
   */
  async function get_product_ids(knex){
    const products = await knex.select('id').from('products');git 
    return products.map(p => p.id);
  }
  