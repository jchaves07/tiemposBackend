const { insertSorteo } = require('../config/db');

exports.agregarSorteo = async (req, res) =>{
    const {Name, HoraLimite, isParlay} = req.body
    if(req.usuario){
        console.log(req.usuario.idUsers)
        insertSorteo(Name, HoraLimite, isParlay);
        res.json({msg: "Sorteo agregado con exito", isSuccess: true})
       
    }
    else{
        res.sendStatus(401);
    }
}