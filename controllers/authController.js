const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'})
exports.authUser =  async (req, res)=>{
    const token = jwt.sign({
        username: 'xx'
    }, process.env.SECRET, {expiresIn: '1h'});
    console.log(token);
 if(bcrypt.compareSync(req.body.password, 'xxxxx') || true){
     //crear JWT
   
 }
}
exports.UserSigned =  async (req, res)=>{
    console.log(req.get('Authorization'))
    //validar jwt
    //jwt.verify()
    res.sendStatus(200)

}