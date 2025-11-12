/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker } = require('@faker-js/faker'); 

exports.seed = async function (knex) {
  
  // await knex('categories').del();

  const categories = [];
  for (let i = 0; i < 5; i++) {
    categories.push({
      name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
    });
  }

  await knex('categories').insert(categories);
};
