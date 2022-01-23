require('dotenv').config({ path: '../variables.env' });
const mysql = require('mysql');


const insertNewUser = (idUsers, Username, Password, Type, AgentParent) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    var userAdd = { idUsers, Username, Password, Type, AgentParent };
    var query = connection.query('INSERT INTO Users SET ?', userAdd, function (error, results, fields) {
        if (error) throw error;
        // Neat!
    });
    console.log(query.sql);
}

exports.insertNewUser = insertNewUser;