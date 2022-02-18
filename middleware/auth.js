const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' })
module.exports = (req, res, next) => {
    //obtener token
    const authToken = req.get('Authorization');
    if(req.error){
        res.send({ msg: req.error, error: "300" }); 
    }
    else{
        if (authToken) {
            //validar jwt
            try {
                const usuario = jwt.verify(authToken.split(' ')[1], process.env.SECRET);
                req.usuario = usuario; 
                 return next();
            }
            catch (error) {
                console.log({ msg: 'Token invalido', error });
                return next();
            }
        }
    }
    
  
}