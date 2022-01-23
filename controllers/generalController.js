const { getSorteos } = require('../config/db');

exports.getSorteos = async (req, res) =>{
    if(req.usuario){
        console.log(req.usuario.idUsers)
        getSorteos().then(response=>{
            res.json({Sorteos: response})
        });
       
    }
    else{
        res.sendStatus(401);
    }
}