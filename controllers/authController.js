const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../config/db');
require('dotenv').config({ path: 'variables.env' })
exports.authUser = async (req, res, next) => {
    const { username, password } = req.body;
    //obtiene user de base de datos
    getUserByUsername(username).then(response => {
        //valida password 
        if (bcrypt.compareSync(password, response.Password)) {
            //crear JWT
            const token = jwt.sign({
                idUsers: response.idUsers,
                Username: response.Username,
                Type: response.Type,
                AgentParent: response.AgentParent
            }, process.env.SECRET, { expiresIn: '10h' });
            res.send({ token });
        }
        else {
            res.status(401).send({ msg: 'usuario o password invalidos' });
            next();
        }
    });



}
exports.UserSigned = async (req, res) => {
 res.json({usuario: req.usuario})
}