const mysql = require( 'mysql2/promise');

pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'usecase2'
});

module.exports = pool;