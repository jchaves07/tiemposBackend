const { insertSorteo, getLimiteSorteo, setGanador, getSorteosBySorteoID, compraNumero } = require('../config/db');

exports.agregarSorteo = async (req, res) =>{
    const {Name, HoraLimite, isParlay, ParleyL, ParleyM, ParleyK, ParleyJ, ParleyV, ParleyS, ParleyD, SorteoL, SorteoM, SorteoK, SorteoJ, SorteoV, SorteoS, SorteoD, Paga} = req.body
    if(req.usuario){
        console.log(req.usuario.idUsers)
        insertSorteo(Name, HoraLimite, isParlay, ParleyL, ParleyM, ParleyK, ParleyJ, ParleyV, ParleyS, ParleyD, SorteoL, SorteoM, SorteoK, SorteoJ, SorteoV, SorteoS, SorteoD, Paga);
        res.json({msg: "Sorteo agregado con exito", isSuccess: true})
       
    }
    else{
        res.sendStatus(401);
    }
}
exports.GetSorteosBySorteoID = async (req, res) =>{
    if(req.usuario){
        const {SorteoID} = req.body;
        getSorteosBySorteoID(SorteoID)
        .then(response => {
            res.json(response);
        })
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

exports.CompraNumeros = async (req, res) =>{
    if(req.usuario){
        const { numeros } = req.body;
        numeros.map(item=>{
            const {IdSorteo , Fecha , IdUser , Numero , Monto} = item;
            compraNumero(IdSorteo , Fecha , req.usuario.idUsers , Numero , Monto);
        })
        
        res.json({msg: "Sorteo agregado con exito", isSuccess: true})
    }
    else{
        res.sendStatus(401);
    }
}
exports.SetGanador = async (req, res) =>{
    if(req.usuario){
        const { IdSorteo, Fecha, Numero } = req.body;
        setGanador(IdSorteo, Fecha, Numero);
        
        res.json({msg: "Sorteo gradeado con exito", isSuccess: true})
    }
    else{
        res.sendStatus(401);
    }
}
