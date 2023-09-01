const mysql = require('mysql2');

const db = mysql.connect({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

module.exports = db;