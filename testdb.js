const db = require('./db');

db.raw('SELECT 1')
  .then(() => {
    console.log('✅ Knex connection works!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Knex connection failed:', err);
    process.exit(1);
  });
