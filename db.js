const mysql = require('mysql2')

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tires',
    password: ""
})

module.exports = pool
