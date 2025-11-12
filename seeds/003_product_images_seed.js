/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker } = require('@faker-js/faker'); 

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
const product_ids=await get_products_ids (knex);

const images=[];

for(const productId of product_ids){
for(let i=0 ; i<3 ; i++){
  images.push({
    image_url: faker.image.urlPicsumPhotos({ width: 600, height: 600 }),
    product_id: productId,
  });
}
}
await knex('product_images').insert(images);

}



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<number[]> }
 */

async function get_products_ids(knex) {
const products = await knex.select('id').from ('products');
  return products.map(p=>p.id);
}