require('dotenv').config({ path: '../variables.env' });
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

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
exports.getsavedToken = (Id) => {

    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('SELECT CurrentToken FROM TiemposDB.Users where idUsers = ?;', [Id], function (err, rows, fields) {
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
exports.getReporteSemanal = (IdAgentParent, Fecha) =>{
    //select * from VW_ReporteSaldos where AgentParent = 3
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER, 
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query(`select * from VW_ReporteSaldos where AgentParent = ${IdAgentParent} or idUsers = ${IdAgentParent} and yearWeek = YEARWEEK('${Fecha}', 1)`, function (err, rows, fields) {
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
exports.editSorteo = ( Id, Name, HoraLimite, ParleyL, ParleyM, ParleyK, ParleyJ, ParleyV, ParleyS, ParleyD, SorteoL, SorteoM, SorteoK, SorteoJ, SorteoV, SorteoS, SorteoD, Paga) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();

    connection.query(`update TiemposDB.Sorteos set Name = '${Name}', HoraLimite = '${HoraLimite}', ParleyL = ${ParleyL}, ParleyM = ${ParleyM}, ParleyK = ${ParleyK}, ParleyJ = ${ParleyJ}, ParleyV = ${ParleyV}, ParleyS = ${ParleyS}, ParleyD = ${ParleyD}, SorteoL = ${SorteoL}, SorteoM = ${SorteoM}, SorteoK = ${SorteoK}, SorteoJ = ${SorteoJ}, SorteoV = ${SorteoV}, SorteoS = ${SorteoS}, SorteoD = ${SorteoD}, Paga = ${Paga} where Id = ${Id}`, function (error, results, fields) {
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
    connection.query('INSERT INTO TiemposDB.Sorteos SET ?', sorteoAdd, function (error, results, fields) {
        if (error) throw error;
        for (let index = 0; index < 100; index++) {
            console.log('xxxxxxxx')
            let limitAdd = {Numero: index, Monto: 0, SorteoId: results.insertId};
            connection.query('INSERT INTO TiemposDB.LimiteGeneralSorteos SET ?', limitAdd, function (er, results, fields) {
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
    connection.query('INSERT INTO TiemposDB.LimiteGeneralSorteos SET ?', limitAdd, function (error, results, fields) {
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
    connection.query('INSERT INTO TiemposDB.LimitePorUsuario SET ?', limitAdd, function (error, results, fields) {
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
    connection.query('DELETE FROM TiemposDB.LimiteGeneralSorteos where SorteoId = ?', [sorteoId], function (error, results, fields) {
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
    connection.query('DELETE FROM TiemposDB.LimitePorUsuario where UserId = ?', [userId], function (error, results, fields) {
        if (error) throw error;
        connection.end();
    });
}
//select * from TiemposDB.LimitePorUsuario where UserId = ?
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

//
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
connection.query('CALL `TiemposDB`.`CheckBuyNumber`(? , ? , ? , ? , ?, ? );', buyNumber, function (error, results, fields) {
    if (error){
        console.log(error)
        connection.end();
        reject(error.sqlMessage)
    }
    connection.end();
    console.log(results)
   resolve(results[0]);
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
exports.getUserById = (id) =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('select * from TiemposDB.VW_UserList where IdUsers = ?', [id], function (err, rows, fields) {
            if (err){
                connection.end();
                reject(err.sqlMessage)
            }
            connection.end();
           resolve(rows[0]);
          })
    })
}

exports.getUserList = (id) =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query(`select  IdUsers, Username, TypeId, Type, AgentParentId, AgentParentUsername, TypeAgentParent,  TypeAgentParentId from    (select * from TiemposDB.VW_UserList         order by AgentParentId, IdUsers) products_sorted,        (select @pv := '${id}') initialisation where   find_in_set(IFNULL(AgentParentId, -1), @pv) and     length(@pv := concat(@pv, ',', IdUsers)) ;`, function (err, rows, fields) {
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
        connection.query('SELECT t.IdSorteo,  case when NumeroGanador is not null then TPNV.Monto * Paga else null end PagaPremio, Paga, t.Disponible, t.Fecha, IFNULL(sum(cn.Monto),0) MontoJugado, (select Numero from  TiemposDB.GanadorPorSorteo p where p.IdSorteo = t.IdSorteo and t.Fecha = p.Fecha) Numero FROM TiemposDB.SorteosDisponibles t left join TiemposDB.CompraNumeros cn on cn.IdSorteo = t.IdSorteo and cn.Fecha = t.Fecha inner join TiemposDB.Sorteos SO on SO.Id = t.IdSorteo left join TiemposDB.TotalPorNumeroView TPNV on TPNV.IdSorteo = t.IdSorteo and t.Fecha = TPNV.Fecha and TPNV.NumeroGanador is not null where t.IdSorteo = ?  group by t.Fecha, Paga,case when NumeroGanador is not null then TPNV.Monto * Paga else null end, t.IdSorteo', [SorteoID], function (err, rows, fields) {
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
exports.jerarquiaUsuarioParent = (Type, AgentParent) =>{
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query(`select idUsers, IFNULL(Fullname, Username) User, UT.Description Type from TiemposDB.Users u inner join TiemposDB.UserTypes UT on UT.Id = u.Type  where AgentParent is null and 0 = ${Type} or UT.Id = ${Type} and AgentParent = ${AgentParent} `, function (err, rows, fields) {
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
exports.DisableSorteo = (IdSorteo, Fecha) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    connection.query('update TiemposDB.SorteosDisponibles set Disponible = !Disponible where IdSorteo = ? and Fecha = ?;',[IdSorteo, Fecha],  function (error, results, fields) {
        if (error) throw error;
        
        connection.end();
    });
}
exports.validaTokens = () =>{
    //SELECT CurrentToken FROM TiemposDB.Users where CurrentToken is not null;
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    connection.connect();
    connection.query('SELECT CurrentToken FROM TiemposDB.Users where CurrentToken is not null;', function (err, rows, fields) {
        if (err){
            console.log(err)
            connection.end();
            
        }
        connection.end();
        rows.map(item=>{
            
                jwt.verify(item.CurrentToken, process.env.SECRET, function(err, decoded){
                    const dec = jwt.decode(item.CurrentToken)
                    console.log({ msg: 'Token', dec });
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
connection.query('CALL `TiemposDB`.`CreateSorteos`();',  function (error, results, fields) {
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
connection.query('CALL `TiemposDB`.`addBaseUserLimit`();',  function (error, results, fields) {
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

exports.GetWeeks = () => {
    return new Promise((resolve, reject) =>{
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        connection.connect();
        connection.query('CALL `TiemposDB`.`getWeek`();', function (err, rows, fields) {
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
        connection.query('select * from TiemposDB.Sorteos where Id = ?', [Id], function (err, rows, fields) {
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
        connection.query(`SELECT Numero, Monto, UserId FROM TiemposDB.LimitePorUsuario where UserId = ${userId}`, function (err, rows, fields) {
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
exports.insertNewUser = insertNewUser;
exports.getUserByUsername = getUserByUsername;
exports.getCurrentBalance = getCurrentBalance;
exports.getSorteos = getSorteos;
exports.insertSorteo = insertSorteo;
exports.getLimiteSorteo = getLimiteSorteo;
exports.saveToken = saveToken;
exports.CreateSorteos = CreateSorteos;