const bcrypt = require('bcrypt');
const { insertNewUser, getCurrentBalance, getUserList } = require('../config/db');
exports.nuevoUsuario = async (req, res) => {
    const { idUsers, username, password, type, agentParent } = req.body
    //crear nuevo usuario 

    const salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, salt);
    insertNewUser(idUsers, username, encryptedPassword, type, agentParent);
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
exports.ObtenerUsuarios = async (req, res) =>{
    if(req.usuario){
        getUserList().then(response =>{
            res.json(response)
        })
    }
    else{
        res.sendStatus(401);
    }
    
}