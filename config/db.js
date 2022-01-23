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
}
const getUserByUsername = (Username) => {

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('SELECT idUsers, Username, Password, Type, AgentParent FROM TiemposDB.Users where Username = ?', [Username], function (err, rows, fields) {
            if (err){
                reject(err.sqlMessage)
            }
          
           resolve(rows[0]);
          })
    })
   
}
const getCurrentBalance = (UserId) => {

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('SELECT IFNULL(sum(Amount*MovementAdd),0) Balance FROM TiemposDB.Movements mov inner join TiemposDB.MovementTypes mt on mt.Id = mov.Type where UserId = ?', [UserId], function (err, rows, fields) {
            if (err){
                reject(err.sqlMessage)
            }
          
           resolve(rows[0].Balance);
          })
    })
   
}
exports.insertNewUser = insertNewUser;
exports.getUserByUsername = getUserByUsername;
exports.getCurrentBalance = getCurrentBalance;