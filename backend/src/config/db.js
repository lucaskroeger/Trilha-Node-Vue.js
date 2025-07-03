const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: 'db-mysql-node',
    user: 'root',
    database: 'estoque',
    password: 'mysql',
    port: 3306,

});

module.exports = pool;
