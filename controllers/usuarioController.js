const bcrypt = require('bcrypt');
const { insertNewUser } = require('../config/db');
exports.nuevoUsuario = async (req, res) => {
    const { idUsers, username, password, type, agentParent } = req.body
    //crear nuevo usuario 

    const salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(password, salt);
    insertNewUser(idUsers, username, encryptedPassword, type, agentParent);
    res.sendStatus(200);
}