const mysql = require('mysql2')

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tires',
    password: '123GR7412gr%'
})

module.exports = pool