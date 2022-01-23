const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' })
module.exports = (req, res, next) => {
    //obtener token
    const authToken = req.get('Authorization');
    if (authToken) {
        //validar jwt
        try {
            const usuario = jwt.verify(authToken.split(' ')[1], process.env.SECRET);
            req.usuario = usuario;
        }
        catch (error) {
            console.log({ msg: 'Token invalido', error });
        }
    }
    return next();
}