const db = require('./db');
function getProducts(callback) {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return callback(err); 
        }
        callback(null, results); 
    });
}

module.exports = { getProducts };

