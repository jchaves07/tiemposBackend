require('dotenv').config({ path: '../variables.env' });
const mysql = require('mysql');


///update TiemposDB.NumerosDisponiblesPorSorteo set Disponible = !Disponible where IdSorteo = 7  and Number = 2 and Fecha = '2022-02-07'
exports.changeAvalaibleNumber = (IdSorteo, numb, Fecha) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    var pos = [ IdSorteo, numb, Fecha ];
    var query = connection.query('update TiemposDB.NumerosDisponiblesPorSorteo set Disponible = !Disponible where IdSorteo = ?  and Number = ? and Fecha = ?', pos, function (error, results, fields) {
        if (error) throw error;
        // Neat!
        connection.end();
    });
}
const insertNewUser = (Username, Password, Type, AgentParent) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    var userAdd = { Username, Password, Type, AgentParent };
    var query = connection.query('INSERT INTO Users SET ?', userAdd, function (error, results, fields) {
        if (error) throw error;
        // Neat!
        connection.end();
    });
}
//select Name, HoraLimite from TiemposDB.Sorteos where Id = 6
exports.getSorteoName = (Id) => {

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('select Name, HoraLimite from TiemposDB.Sorteos where Id = ?', [Id], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows[0]);
          })
    }) 
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
exports.getReporteSemanal = (IdAgentParent) =>{
    //select * from VW_ReporteSaldos where AgentParent = 3
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('select * from VW_ReporteSaldos where AgentParent = ? or idUsers = ?', [IdAgentParent, IdAgentParent], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
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
        connection.query('SELECT id, Name, HoraLimite, isParlay, Paga FROM TiemposDB.Sorteos', function (err, rows, fields) {
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
const insertSorteo = ( Name, HoraLimite, isParlay, ParleyL, ParleyM, ParleyK, ParleyJ, ParleyV, ParleyS, ParleyD, SorteoL, SorteoM, SorteoK, SorteoJ, SorteoV, SorteoS, SorteoD, Paga) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    var sorteoAdd = {  Name, HoraLimite, isParlay, ParleyL, ParleyM, ParleyK, ParleyJ, ParleyV, ParleyS, ParleyD, SorteoL, SorteoM, SorteoK, SorteoJ, SorteoV, SorteoS, SorteoD, Paga };
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

//
exports.VentasPorNumero = (IdSorteo , Fecha) =>{

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        var filter = [  IdSorteo , Fecha ]; 
        var sql = mysql.format('select Number, Sum(Monto) Monto, Fecha, Disponible from (SELECT x.Number,x.Fecha, IFNULL(t.Monto,0) Monto, x.Disponible FROM TiemposDB.NumerosDisponiblesPorSorteo x left join TiemposDB.CompraNumeros t on x.IdSorteo = t.IdSorteo and t.Fecha = x.Fecha and x.Number = t.Numero where x.IdSorteo = ? and x.Fecha = ?) x group by Number, Fecha, Disponible', filter);
        console.log(sql)
        connection.query(sql, function (error, results, fields) {
            if (error){
                connection.end();
                reject(error.sqlMessage)
            }
            connection.end();
           resolve(results);
        });
    })


}


exports.compraNumero = (IdSorteo , Fecha , IdUser , Numero , Monto, IdTicket) =>{
    const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
connection.connect();
var buyNumber = [  IdSorteo , Fecha , IdUser , Numero , Monto, IdTicket ];
connection.query('CALL `TiemposDB`.`BuyNumber`(? , ? , ? , ? , ?, ? );', buyNumber, function (error, results, fields) {
    if (error) throw error;
    
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
exports.getSorteosBySorteoID = SorteoID =>{
   
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('SELECT t.Fecha, IFNULL(sum(Monto),0) MontoJugado, (select Numero from  TiemposDB.GanadorPorSorteo p where p.IdSorteo = t.IdSorteo and t.Fecha = p.Fecha) Numero FROM TiemposDB.SorteosDisponibles t left join TiemposDB.CompraNumeros cn on cn.IdSorteo = t.IdSorteo and cn.Fecha = t.Fecha where t.IdSorteo = ? group by t.Fecha', [SorteoID], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}
exports.GetNumerosDisponibles = (SorteoID, Fecha) =>{
   
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        var filter = [  SorteoID , Fecha ]; 
        connection.query('SELECT Number, Disponible FROM TiemposDB.NumerosDisponiblesPorSorteo where IdSorteo = ? and Fecha = ?', filter, function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}
//select idUsers, IFNULL(Fullname, Username) User, UT.Description Type from TiemposDB.Users u inner join TiemposDB.UserTypes UT on UT.Id = u.Type  where AgentParent is null and 0 = 0
exports.jerarquiaUsuarioParent = Type =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('select idUsers, IFNULL(Fullname, Username) User, UT.Description Type from TiemposDB.Users u inner join TiemposDB.UserTypes UT on UT.Id = u.Type  where AgentParent is null and 0 = ?', [Type], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}


exports.jerarquiaUsuarioByAgentParent = AgentParent =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('SELECT idUsers, IFNULL(Fullname, Username) User, UT.Description Type, UT.Id IdType FROM TiemposDB.Users u inner join TiemposDB.UserTypes UT on UT.Id = u.Type where AgentParent = ?', [AgentParent], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}
//

exports.cloneTicket = IdTicket =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('select Numero, Monto from TiemposDB.CompraNumeros	where IdTicket = ?', [IdTicket], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}

//select * from TiemposDB.VW_Movements where createdDate = ? and UserId = ?
exports.getUserMovementsByDateAndUser = (createdDate,UserId) =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('select * from TiemposDB.VW_Movements where Date(createdDate) = ? and UserId = ?', [createdDate, UserId], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}

exports.getUserMovements = UserId =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('SELECT * FROM VW_Movements where UserId = ?', [UserId], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}

exports.AgregaSaldo = (IdUser , PartentID , Amount) =>{
    const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
connection.connect();
var addAmount = [  IdUser , PartentID , Amount ];
connection.query('CALL `TiemposDB`.`AddAmount`(? , ? , ? );', addAmount, function (error, results, fields) {
    if (error) throw error;
    
    connection.end();
});
}

exports.CreateSorteos = () =>{
    const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
connection.connect();
connection.query('CALL `TiemposDB`.`CreateSorteos`();',  function (error, results, fields) {
    if (error) throw error;
    
    connection.end();
});
}
exports.setGanador = (IdSorteo, Fecha, Numero) => {
    // 
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    
    var addWinner = [IdSorteo, Fecha, Numero];
connection.query('CALL `TiemposDB`.`DeclaraGanador`(? , ? , ? );', addWinner, function (error, results, fields) {
    if (error) throw error;
    
    connection.end();
});
}

exports.GetAvalaibleSorteos = () => {
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('SELECT * FROM VW_GetAvalaibleSorteos', function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}
exports.GetIdTicket = () => {
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('CALL `TiemposDB`.`CreateTicketNumber`();', function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows[0]);
          })
    })
}
exports.insertNewUser = insertNewUser;
exports.getUserByUsername = getUserByUsername;
exports.getCurrentBalance = getCurrentBalance;
exports.getSorteos = getSorteos;
exports.insertSorteo = insertSorteo;
exports.getLimiteSorteo = getLimiteSorteo;