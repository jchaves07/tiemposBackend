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
        connection.end();
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
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
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
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows[0].Balance);
          })
    })
}

const getSorteos = () => {

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('SELECT id, Name, HoraLimite, isParlay FROM TiemposDB.Sorteos', function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
   
}
const getLimiteSorteo = (id) => {

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('SELECT Numero, Monto, SorteoId FROM TiemposDB.LimiteGeneralSorteos where SorteoId = ?', [id], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}
const insertSorteo = ( Name, HoraLimite, isParlay) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    var sorteoAdd = {  Name, HoraLimite, isParlay };
    connection.query('INSERT INTO TiemposDB.Sorteos SET ?', sorteoAdd, function (error, results, fields) {
        if (error) throw error;
        for (let index = 0; index < 100; index++) {
            let limitAdd = {Numero: index, Monto: 0, SorteoId: results.insertId};
            connection.query('INSERT INTO TiemposDB.LimiteGeneralSorteos SET ?', limitAdd, function (error, results, fields) {
            })
        }
        connection.end();
    });
}

exports.getUserList = () =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('select * from TiemposDB.VW_UserList', function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}
exports.insertNewUser = insertNewUser;
exports.getUserByUsername = getUserByUsername;
exports.getCurrentBalance = getCurrentBalance;
exports.getSorteos = getSorteos;
exports.insertSorteo = insertSorteo;
exports.getLimiteSorteo = getLimiteSorteo;