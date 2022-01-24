const { insertSorteo, getLimiteSorteo } = require('../config/db');

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
exports.getLimiteSorteo = async (req, res) =>{
    if(req.usuario){
        const { id } = req.body;
        getLimiteSorteo(id).then(response=>{
            res.json(response)
        });
       
    }
    else{
        res.sendStatus(401);
    }
}