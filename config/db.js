require('dotenv').config({ path: '../variables.env' });
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

///update NumerosDisponiblesPorSorteo set Disponible = !Disponible where IdSorteo = 7  and Number = 2 and Fecha = '2022-02-07'
exports.changeAvalaibleNumber = (IdSorteo, numb, Fecha) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    var pos = [ IdSorteo, numb, Fecha ]; ///
    var query = connection.query('update NumerosDisponiblesPorSorteo set Disponible = !Disponible where IdSorteo = ?  and Number = ? and Fecha = ?', pos, function (error, results, fields) {
        if (error) throw error;
        // Neat!
        connection.end();
    });
}
exports.getsavedToken = (Id) => {

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('SELECT CurrentToken FROM Users where idUsers = ?;', [Id], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows[0]);
          })
    }) 
}
//
function saveToken (id, token) {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    var query = connection.query(`UPDATE Users SET CurrentToken= ${token ? `'${token}'` : "null" }  where idUsers = ${id}`, function (error, results, fields) {
        if (error) throw error;
        // Neat!
        connection.end();
    });
}
//cambiarpass
exports.cambiarpass = (id, Password) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    var userEdit = { Password, id };
    var query = connection.query(`UPDATE Users SET Password= '${Password}' where idUsers = ${id}`, function (error, results, fields) {
        if (error) throw error;
        // Neat!
        connection.end();
    });
}
const insertNewUser = (Username, Fullname, Password, Type, AgentParent) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    var userAdd = { Fullname,Username, Password, Type, AgentParent };

    var query = connection.query('INSERT INTO Users SET ?', userAdd, function (error, results, fields) {
        if (error) throw error;
        connection.end();
    });
}
exports.insertNewUserExt = (Username, Fullname, Password, Type, AgentParent, Email) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    var userAdd = { Fullname,Username, Password, Type, AgentParent, Phone: Username, Email };

    var query = connection.query('INSERT INTO Users SET ?', userAdd, function (error, results, fields) {
        if (error) throw error;
        connection.end();
    });
}
//select Name, HoraLimite from Sorteos where Id = 6
exports.getSorteoName = (Id) => {

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('select Name, HoraLimite from Sorteos where Id = ?', [Id], function (err, rows, fields) {
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
        connection.query('SELECT idUsers, Username, Fullname, Password, Type, AgentParent, P.*  FROM Users U left join Permisos P on P.IdUser = U.idUsers where Username = ?', [Username], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows[0]);
          })
    }) 
}
exports.getReporteSemanal = (IdAgentParent, Fecha) =>{

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER, 
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        console.warn(IdAgentParent)
       // console.warn(`select x.* from (select * from VW_ReporteSaldos where AgentParent = ${IdAgentParent} and yearWeek = YEARWEEK('${Fecha}', 1) AND IFNULL(YEARWEEKS , yearWeek -1) < YEARWEEK('${Fecha}', 1) or idUsers =  ${IdAgentParent} and yearWeek = YEARWEEK('${Fecha}', 1) AND IFNULL(YEARWEEKS , yearWeek -1) < YEARWEEK('${Fecha}', 1) order by YEARWEEKS desc) as x inner join (select idUsers, MAX(IFNULL(YEARWEEKS , yearWeek)) YEARWEEKS from VW_ReporteSaldos where AgentParent = ${IdAgentParent} and yearWeek = YEARWEEK('${Fecha}', 1) AND IFNULL(YEARWEEKS , yearWeek -1) < YEARWEEK('${Fecha}', 1) or idUsers =  ${IdAgentParent} and yearWeek = YEARWEEK('${Fecha}', 1) AND IFNULL(YEARWEEKS , yearWeek -1) < YEARWEEK('${Fecha}', 1) group by idUsers) as y on x.idUsers = y.idUsers and x.YEARWEEKS = y.YEARWEEKS;`)
        connection.query(`select x.* from (select * from VW_ReporteSaldos where AgentParent = ${IdAgentParent} and yearWeek = YEARWEEK('${Fecha}', 1) AND IFNULL(YEARWEEKS , yearWeek) <= YEARWEEK('${Fecha}', 1) or idUsers =  ${IdAgentParent} and yearWeek = YEARWEEK('${Fecha}', 1) AND IFNULL(YEARWEEKS , yearWeek) <= YEARWEEK('${Fecha}', 1) order by YEARWEEKS desc) as x left join (select idUsers, MAX(IFNULL(YEARWEEKS , yearWeek)) YEARWEEKS from VW_ReporteSaldos where AgentParent = ${IdAgentParent} and yearWeek = YEARWEEK('${Fecha}', 1) AND IFNULL(YEARWEEKS , yearWeek) <= YEARWEEK('${Fecha}', 1) or idUsers =  ${IdAgentParent} and yearWeek = YEARWEEK('${Fecha}', 1) AND IFNULL(YEARWEEKS , yearWeek) <= YEARWEEK('${Fecha}', 1) group by idUsers) as y on x.idUsers = y.idUsers and x.YEARWEEKS = y.YEARWEEKS limit 1;`, function (err, rows, fields) {
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
        connection.query('SELECT IFNULL(sum(Amount*MovementAdd),0) Balance FROM Movements mov inner join MovementTypes mt on mt.Id = mov.Type where UserId = ?', [UserId], function (err, rows, fields) {
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
        connection.query('SELECT id, Name, HoraLimite, isParlay, Paga,borrar Borrar, Enable FROM SorteosView', function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}
exports.getPermisos = (IdUser) => {

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query(`SELECT * FROM Permisos where IdUser = ${IdUser};`, function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows[0]);
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
        connection.query('SELECT Numero, Monto, SorteoId FROM LimiteGeneralSorteos where SorteoId = ?', [id], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}
exports.editSorteo = ( Id, Name, HoraLimite, ParleyL, ParleyM, ParleyK, ParleyJ, ParleyV, ParleyS, ParleyD, SorteoL, SorteoM, SorteoK, SorteoJ, SorteoV, SorteoS, SorteoD, Paga) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();

    connection.query(`update Sorteos set Name = '${Name}', HoraLimite = '${HoraLimite}', ParleyL = ${ParleyL}, ParleyM = ${ParleyM}, ParleyK = ${ParleyK}, ParleyJ = ${ParleyJ}, ParleyV = ${ParleyV}, ParleyS = ${ParleyS}, ParleyD = ${ParleyD}, SorteoL = ${SorteoL}, SorteoM = ${SorteoM}, SorteoK = ${SorteoK}, SorteoJ = ${SorteoJ}, SorteoV = ${SorteoV}, SorteoS = ${SorteoS}, SorteoD = ${SorteoD}, Paga = ${Paga} where Id = ${Id}`, function (error, results, fields) {
        if (error) throw error;
        connection.end();
    });
}
//UPDATE Permisos SET IdUser = IdUser, CambiarPassword = CambiarPassword,AgregarUsuario = AgregarUsuario, LimitesUsuario = LimitesUsuario, AgregarSaldo = AgregarSaldo, EditarSorteo = EditarSorteo, DeclaraGanador = DeclaraGanador, MontoMinimo = MontoMinimo, LimiteSorteo = LimiteSorteo WHERE IdUser = ;
exports.UpdatePermisos = ( IdUser, CambiarPassword,AgregarUsuario, LimitesUsuario, AgregarSaldo, EditarSorteo, DeclaraGanador, MontoMinimo, LimiteSorteo, Permisos, AnularSorteo, AnularTicket ) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    connection.query(`UPDATE Permisos SET AnularSorteo = ${AnularSorteo ? 1 : 0}, AnularTicket= ${AnularTicket ? 1 : 0}, Permisos= ${Permisos ? 1 : 0}, CambiarPassword = ${CambiarPassword ? 1 : 0 },AgregarUsuario = ${AgregarUsuario ? 1 : 0 }, LimitesUsuario = ${LimitesUsuario ? 1 : 0 }, AgregarSaldo = ${AgregarSaldo ? 1 : 0 }, EditarSorteo = ${EditarSorteo ? 1 : 0 }, DeclaraGanador = ${DeclaraGanador ? 1 : 0 }, MontoMinimo = ${MontoMinimo ? 1 : 0 }, LimiteSorteo = ${LimiteSorteo ? 1 : 0} WHERE IdUser = ${IdUser};`, function (error, results, fields) {
        if (error) throw error;
        connection.end();
    });
}
exports.BorrarSorteo = ( IdSorteo ) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    connection.query(`update Sorteos set Enable = 0  where Id = ${IdSorteo};`, function (error, results, fields) {
        if (error) throw error;
        connection.end();
    });
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
    connection.query('INSERT INTO Sorteos SET ?', sorteoAdd, function (error, results, fields) {
        if (error) throw error;
        for (let index = 0; index < 100; index++) {
            let limitAdd = {Numero: index, Monto: 0, SorteoId: results.insertId};
            connection.query('INSERT INTO LimiteGeneralSorteos SET ?', limitAdd, function (er, results, fields) {
                if (er) {
                    console.log(er)
                }
            })
        }
        CreateSorteos();
        connection.end();
    });
}
exports.InsertLimitePorSorteo = ( sorteoId, item ) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    let limitAdd = {Numero: Number(item.label), Monto: Number(item.value), SorteoId: sorteoId};
    connection.query('INSERT INTO LimiteGeneralSorteos SET ?', limitAdd, function (error, results, fields) {
        if (error) throw error;
        connection.end();
    });
}
exports.InsertLimitePorUsuario = ( userId, item ) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    let limitAdd = {UserId: userId, Numero: Number(item.label), Monto: Number(item.value)};
    connection.query('INSERT INTO LimitePorUsuario SET ?', limitAdd, function (error, results, fields) {
        if (error) throw error;
        connection.end();
    });
}
exports.deleteLimitesPorSorteo = ( sorteoId ) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    connection.query('DELETE FROM LimiteGeneralSorteos where SorteoId = ?', [sorteoId], function (error, results, fields) {
        if (error) throw error;
        connection.end();
    });
}
exports.deleteLimites = ( userId ) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    connection.query('DELETE FROM LimitePorUsuario where UserId = ?', [userId], function (error, results, fields) {
        if (error) throw error;
        connection.end();
    });
}
//select * from LimitePorUsuario where UserId = ?
exports.VentasPorNumero = (IdUser, IdSorteo , Fecha) =>{

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        var filter = [ IdUser, IdSorteo , Fecha ]; 
        var sql = mysql.format('CALL `VentasPorNumero`(?,?,?);', filter);
        console.warn(sql)
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
exports.resumenGranTotal = (IdUser, Fecha) =>{
    return new Promise((resolve, reject) =>{
    const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE  
})
connection.connect(); 
var buyNumber = [IdUser, Fecha]; 
connection.query('CALL `resumenGranTotal`(?, ?);', buyNumber, function (error, results, fields) {
    if (error){
        console.log(error) 
        connection.end();
        reject(error.sqlMessage)
    } 
    connection.end();
   resolve(results[0]);
});
})
}
exports.ValidaCompraNumero = (IdSorteo , Fecha , IdUser , Numero , Monto, IdTicket) =>{
    return new Promise((resolve, reject) =>{
    const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
connection.connect(); 
var buyNumber = [  IdSorteo , Fecha , IdUser , Numero , Monto, IdTicket ];
connection.query('CALL `CheckBuyNumber`(? , ? , ? , ? , ?, ? );', buyNumber, function (error, results, fields) {
    if (error){
        console.log(error)
        connection.end();
        reject(error.sqlMessage)
    }
    connection.end();
   resolve(results[0]);
});
})
}
//revertSorteo IdSorteo INT, IN Fecha
exports.revertSorteo = (IdSorteo, Fecha, Commentario) =>{
    const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
connection.connect();
var revertBuyNumber = [  IdSorteo, Fecha, Commentario ];
connection.query('CALL `revertSorteo`(?, ?, ?);', revertBuyNumber, function (error, results, fields) {
    if (error) throw error;
    
    connection.end();
});
}

exports.revertBuy = (IdMov, comments) =>{
    const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
connection.connect();
var revertBuyNumber = [  IdMov, comments ];
console.warn(revertBuyNumber)
connection.query('CALL `revertNumber`(?, ?);', revertBuyNumber, function (error, results, fields) {
    if (error) throw error;
    
    connection.end();
});
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
connection.query('CALL `BuyNumber`(? , ? , ? , ? , ?, ? );', buyNumber, function (error, results, fields) {
    if (error) throw error;
    
    connection.end();
});
}
exports.getUserById = (id) =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('select * from VW_UserList where IdUsers = ?', [id], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows[0]);
          })
    })
}

exports.GetMontoMinimoCompra = () =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('SELECT * FROM MontoMinimoCompra', function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows[0]);
          })
    })
}
//SELECT * FROM MontoMinimoCompra

exports.getUserList = (id) =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query(`select  IdUsers,Fullname, Username, TypeId, Type, AgentParentId, AgentParentUsername, TypeAgentParent,  TypeAgentParentId from    (select * from VW_UserList         order by AgentParentId, IdUsers) products_sorted,        (select @pv := '${id}') initialisation where   find_in_set(IFNULL(AgentParentId, -1), @pv) and     length(@pv := concat(@pv, ',', IdUsers)) ;`, function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}
exports.getSorteosBySorteoID = (IdUser, SorteoID) =>{
    
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query(`CALL SorteosBySorteoID('${IdUser}',${SorteoID});`, function (err, rows, fields) {
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
        connection.query('SELECT Number, Disponible FROM NumerosDisponiblesPorSorteo where IdSorteo = ? and Fecha = ?', filter, function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}
//select idUsers, IFNULL(Fullname, Username) User, UT.Description Type from Users u inner join UserTypes UT on UT.Id = u.Type  where AgentParent is null and 0 = 0
exports.jerarquiaUsuarioParent = (Type, AgentParent) =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        console.warn(`select idUsers, IFNULL(Fullname, Username) User, UT.Description Type from Users u inner join UserTypes UT on UT.Id = u.Type  where AgentParent is null and 0 = ${Type} or UT.Id = ${Type} and AgentParent = ${AgentParent} `)
        connection.query(`select idUsers, IFNULL(Fullname, Username) User, UT.Description Type from Users u inner join UserTypes UT on UT.Id = u.Type  where AgentParent is null and 0 = ${Type} or UT.Id = ${Type == 1 ? 2 : Type} and AgentParent = ${AgentParent} `, function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
            console.log(rows)
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
        connection.query('SELECT idUsers, IFNULL(Fullname, Username) User,Username, UT.Description Type, UT.Id IdType FROM Users u inner join UserTypes UT on UT.Id = u.Type where AgentParent = ?', [AgentParent], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
            console.log(rows)
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
        connection.query('select Numero, Monto from CompraNumeros	where IdTicket = ?', [IdTicket], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}

//select * from VW_Movements where createdDate = ? and UserId = ?
exports.getUserMovementsByDateAndUser = (createdDate,UserId) =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('select * from VW_Movements where Date(createdDate) = ? and UserId = ? order by IdMov desc', [createdDate, UserId], function (err, rows, fields) {
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
        connection.query(`SELECT  AmountUnit, IdMov, Amount, Comments, UserId, Sorteo, Numero, Color, FechaSorteo, createdDate, case when Amount > 0 then Amount else 0 end credit, case when Amount < 0 then Amount else 0 end debit, IdTicket, COALESCE(((SELECT SUM(Amount) FROM VW_MovementsRes b WHERE b.IdMov <= a.IdMov AND UserId = '${UserId}' and Amount > 0) + (SELECT SUM(Amount) FROM VW_MovementsRes b WHERE b.IdMov <= a.IdMov AND UserId = '${UserId}' and Amount < 0)), 0) as balance, MovType FROM VW_MovementsRes a WHERE UserId = '${UserId}' ORDER BY IdMov DESC;`, function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}

exports.AgregaSaldo = (IdUser , PartentID , Amount, Comments) =>{
    const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
connection.connect();
var addAmount = [  IdUser , PartentID , Amount, Comments ];
connection.query('CALL `AddAmount`(? , ? , ?, ? );', addAmount, function (error, results, fields) {
    if (error) throw error;
    
    connection.end();
});
}
exports.DisableSorteo = (IdSorteo, Fecha) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    connection.query('update SorteosDisponibles set Disponible = !Disponible where IdSorteo = ? and Fecha = ?;',[IdSorteo, Fecha],  function (error, results, fields) {
        if (error) throw error;
        
        connection.end();
    });
}
exports.ModificarMontoMinimo = (Monto) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    connection.query('UPDATE MontoMinimoCompra X SET X.MontoMinimoCompra = ?;',[Monto],  function (error, results, fields) {
        if (error) throw error;
        
        connection.end();
    });
}
exports.validaTokens = () =>{
    //SELECT CurrentToken FROM Users where CurrentToken is not null;
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    connection.query('SELECT CurrentToken FROM Users where CurrentToken is not null;', function (err, rows, fields) {
        if (err){
            console.log(err)
            connection.end();
            
        }
        connection.end();
        rows.map(item=>{
            
                jwt.verify(item.CurrentToken, process.env.SECRET, function(err, decoded){
                    const dec = jwt.decode(item.CurrentToken)
                    saveToken(dec.idUsers, null)
                }) 
            
           
            
        })
      
      })
}
const CreateSorteos = () =>{
    const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
connection.connect();
connection.query('CALL `CreateSorteos`();',  function (error, results, fields) {
    if (error) throw error;
    
    connection.end();
});
}
exports.addBaseUserLimit = () =>{
    const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
connection.connect();
connection.query('CALL `addBaseUserLimit`();',  function (error, results, fields) {
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
connection.query('CALL `DeclaraGanador`(? , ? , ? );', addWinner, function (error, results, fields) {
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
        connection.query('CALL `CreateTicketNumber`();', function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows[0]);
          })
    })
}

exports.GetWeeks = () => {
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('CALL `getWeek`();', function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}
exports.getSorteoById = (Id) => {

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('select * from Sorteos where Id = ?', [Id], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows[0]);
          })
    }) 
}
exports.getLimiteSorteoPorUser = (userId) => {

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        console.warn("FRFRFR")
        connection.connect(); 
        connection.query(`SELECT Numero, Monto, UserId FROM LimitePorUsuario where UserId = ${userId}`, function (err, rows, fields) {
            if (err){
                console.warn(err)
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows);
          })
    })
}
exports.GetGroups = (id) =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query(`SELECT * FROM TiemposDB.LastSorteoView where GroupId = ${id}`, function (err, rows, fields) {
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
exports.saveToken = saveToken;
exports.CreateSorteos = CreateSorteos;