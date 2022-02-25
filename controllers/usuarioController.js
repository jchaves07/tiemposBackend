const bcrypt = require('bcrypt');
const { insertNewUser, cambiarpass, getUserById, addBaseUserLimit, getUserMovementsByDateAndUser, jerarquiaUsuarioByAgentParent, getCurrentBalance, jerarquiaUsuarioParent, getSorteosBySorteoID, getUserList, getUserMovements, AgregaSaldo } = require('../config/db');
exports.nuevoUsuario = async (req, res) => {
    const {  username,fullname, password, type, agentParent } = req.body
    //crear nuevo usuario 

    const salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, salt);
    insertNewUser(username, fullname, encryptedPassword, type, agentParent);
    addBaseUserLimit();
    res.sendStatus(200);
}
exports.cambiarpass = async (req, res) => {
    const {  id, password,  } = req.body
    const salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, salt);
    cambiarpass(id, encryptedPassword);
    res.sendStatus(200);
}
exports.ObtenerSaldo = async (req, res) =>{
    if(req.usuario){
        getCurrentBalance(req.usuario.idUsers).then(response=>{
            res.json({Balance: response})
        });
       
    } 
    else{
        res.sendStatus(401);
    }
}
//
exports.jerarquiaUsuarioByAgentParent = async (req, res) =>{
    const {Agentparent} = req.body;
    if(req.usuario){
        jerarquiaUsuarioByAgentParent(Agentparent).then(response=>{
            res.json(response)
        });
       
    }
    else{
        res.sendStatus(401);
    }
}
exports.jerarquiaUsuarioParent = async (req, res) =>{
    const {Type, AgentParent} = req.body;
    if(req.usuario){
        jerarquiaUsuarioParent(Type, AgentParent).then(response=>{
            res.json(response)
        });
       
    }
    else{
        res.sendStatus(401);
    }
}

exports.ObtenerSaldoByUserId = async (req, res) =>{
    const {UserId} = req.body;
    if(req.usuario){
        getCurrentBalance(UserId).then(response=>{
            res.json({Balance: response})
        });
       
    }
    else{
        res.sendStatus(401);
    }
}

exports.getUserMovementsByDateAndUser = async (req,res) =>{
    const {UserId, CreatedDate} = req.body;
    if(req.usuario){
        getUserMovementsByDateAndUser(CreatedDate, UserId).then(response =>{
            res.json(response)
        })
    }
    else{
        res.sendStatus(401);
    }
    
}
exports.getUserMovements = async (req,res) =>{
    if(req.usuario){
        getUserMovements(req.usuario.idUsers).then(response =>{
            res.json(response)
        })
    }
    else{
        res.sendStatus(401);
    }
    
}
exports.ObtenerUsuarios = async (req, res) =>{
    if(req.usuario){
        req.usuario
        getUserList(req.usuario.Type < 1 ? -1 : req.usuario.idUsers).then(response =>{
            res.json(response)
        })
    }
    else{
        res.sendStatus(401);
    }
    
}
exports.ObtenerUsuario = async (req, res) =>{
    if(req.usuario){
        const {idUser} = req.body;
        getUserById(idUser).then(response =>{
            res.json(response)
        })
    }
    else{
        res.sendStatus(401);
    }
    
}
exports.AgregaSaldo = async (req, res) =>{
    if(req.usuario){
      
            const {userId, Amount} = req.body;
            AgregaSaldo(userId , req.usuario.idUsers, Amount);
      
        
        res.json({msg: "Compra Numeros con exito", isSuccess: true})
    }
    else{
        res.json(req.usuario);
    }
}

