const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' })
const { getsavedToken, getUserByUsername, saveToken } = require('../config/db');
module.exports = async (req, res, next) => {
    //obtener token
    const authToken = req.get('Authorization');
    const { username, deleteToken } = req.body;


    //validar jwt


    const response = jwt.decode(authToken.split(' ')[1])
    //    console.log(response)
    const resx = await getsavedToken(response.idUsers)
    if (resx.CurrentToken != undefined && resx.CurrentToken != "" && resx.CurrentToken != null) {
        if(resx.CurrentToken != authToken.split(' ')[1]){
            req.error = "Sesion abierta en otro navegador, desea cerrar la otra sesion?";
        }
        
        return next();
    }

    return next();




}