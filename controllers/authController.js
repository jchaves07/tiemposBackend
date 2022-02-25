const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByUsername, saveToken } = require('../config/db');
require('dotenv').config({ path: 'variables.env' })
exports.authUser = async (req, res, next) => {
    console.log("second", req.error)
    if(req.error){
        res.send({ msg: req.error, error: "300" }); 
    }
    else{
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
                Fullname: response.Fullname,
                AgentParent: response.AgentParent
            }, process.env.SECRET, { expiresIn: '15m' });
            saveToken(response.idUsers, token);
            res.send({ token });
        }
        else {
            res.status(401).send({ msg: 'usuario o password invalidos' });
            next();
        }
    });
    }
    



}
exports.UserSigned = async (req, res) => {
 res.json({usuario: req.usuario})
}