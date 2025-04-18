const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Killz',
    password: 'Sempreassim23!',
    database: 'FlyEasy'
});

db.connect((err) => {
    if(err) throw err;
    console.log("Conectado á FlyEasy");
});

module.exports = db;