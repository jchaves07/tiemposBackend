const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' })
const { getsavedToken, getUserByUsername, saveToken } = require('../config/db');
module.exports = async (req, res, next) => {
    //obtener token
    const authToken = req.get('Authorization');
    const { username, deleteToken } = req.body;
    if(deleteToken){
        getUserByUsername(username).then(response => {
            saveToken(response.idUsers, null);
            return next();
        })
    }
    else {
        //validar jwt
       
            
            const response = await getUserByUsername(username)
            console.log(response)
           if(response != undefined && response.idUsers != undefined){
            const resx = await getsavedToken(response.idUsers)
            if(resx.CurrentToken != undefined && resx.CurrentToken != "" && resx.CurrentToken != null){
              req.error = "Sesion abierta en otro navegador, desea cerrar la otra sesion?";
              return next();
            }
           }
         
            return next();
     
        
    }

}