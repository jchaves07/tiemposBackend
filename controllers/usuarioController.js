const bcrypt = require('bcrypt');
const { insertNewUser, getCurrentBalance } = require('../config/db');
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
        console.log(req.usuario.idUsers)
        getCurrentBalance(req.usuario.idUsers).then(response=>{
            res.json({Balance: response})
        });
       
    }
    else{
        res.sendStatus(401);
    }
    
}