/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const { faker } = require('@faker-js/faker');

exports.seed = async function(knex) {
  // جلب كل المخزون الحالي
  const inventories = await knex('inventories').select('id');

  for (const inv of inventories) {
    await knex('inventories')
      .where('id', inv.id)
      .update({ 
        name: faker.commerce.department() 
      });
  }

  console.log('Inventory names have been filled!');
};
