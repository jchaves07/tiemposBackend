const { insertSorteo, BorrarSorteo, ValidaCompraNumero, ModificarMontoMinimo, GetMontoMinimoCompra, resumenGranTotal, InsertLimitePorSorteo, deleteLimitesPorSorteo, InsertLimitePorUsuario, deleteLimites, getLimiteSorteoPorUser, editSorteo, getSorteoById, DisableSorteo, cloneTicket, GetIdTicket,VentasPorNumero,changeAvalaibleNumber, GetNumerosDisponibles, getLimiteSorteo,getSorteoName, setGanador, getSorteosBySorteoID, compraNumero } = require('../config/db');

exports.changeAvalaibleNumber = async (req, res) => {
    const {IdSorteo, numb, Fecha} = req.body
    if(req.usuario){

        changeAvalaibleNumber(IdSorteo, numb, Fecha);
        res.json({msg: "Sorteo con exito", isSuccess: true})
       
    }
    else{
        res.sendStatus(401);
    }

}
exports.BorrarSorteo = async (req, res) => {
    const {IdSorteo} = req.body
    if(req.usuario){

        BorrarSorteo(IdSorteo);
        res.json({msg: "Sorteo con exito", isSuccess: true})
       
    }
    else{
        res.sendStatus(401);
    }

}

exports.updateLimitesPorUsuario = async (req, res) =>{
    const { numeros, userId } = req.body
    if(req.usuario){
        numeros.map(itm=>{
            InsertLimitePorUsuario(userId, itm)
        })
        res.json({msg: "exito", isSuccess: true})
       
    }
    else{
        res.sendStatus(401);
    }
}
exports.InsertLimitePorSorteo = async (req, res) =>{
    const { numeros, sorteoId } = req.body
    if(req.usuario){
        numeros.map(itm=>{
            InsertLimitePorSorteo(sorteoId, itm)
        })
        res.json({msg: "exito", isSuccess: true})
       
    }
    else{
        res.sendStatus(401);
    }
}
//InsertLimitePorSorteo
exports.deleteLimitesPorSorteo = async (req, res) =>{
    const { sorteoId } = req.body
    if(req.usuario){

        deleteLimitesPorSorteo(sorteoId);
        res.json({msg: "exito", isSuccess: true})
       
    }
    else{
        res.sendStatus(401);
    }
}
exports.deleteLimites = async (req, res) =>{
    const { userId } = req.body
    if(req.usuario){

        deleteLimites(userId);
        res.json({msg: "exito", isSuccess: true})
       
    }
    else{
        res.sendStatus(401);
    }
}
exports.editSorteo = async (req, res) =>{
    const {Id, Name, HoraLimite, ParleyL, ParleyM, ParleyK, ParleyJ, ParleyV, ParleyS, ParleyD, SorteoL, SorteoM, SorteoK, SorteoJ, SorteoV, SorteoS, SorteoD, Paga} = req.body
    if(req.usuario){

        editSorteo(Id, Name, HoraLimite, ParleyL, ParleyM, ParleyK, ParleyJ, ParleyV, ParleyS, ParleyD, SorteoL, SorteoM, SorteoK, SorteoJ, SorteoV, SorteoS, SorteoD, Paga);
        res.json({msg: "Sorteo agregado con exito", isSuccess: true})
       
    }
    else{
        res.sendStatus(401);
    }
}
exports.agregarSorteo = async (req, res) =>{
    const {Name, HoraLimite, isParlay, ParleyL, ParleyM, ParleyK, ParleyJ, ParleyV, ParleyS, ParleyD, SorteoL, SorteoM, SorteoK, SorteoJ, SorteoV, SorteoS, SorteoD, Paga} = req.body
    if(req.usuario){

        insertSorteo(Name, HoraLimite, isParlay, ParleyL, ParleyM, ParleyK, ParleyJ, ParleyV, ParleyS, ParleyD, SorteoL, SorteoM, SorteoK, SorteoJ, SorteoV, SorteoS, SorteoD, Paga);
        res.json({msg: "Sorteo agregado con exito", isSuccess: true})
       
    }
    else{
        res.sendStatus(401);
    }
}
exports.ModificarMontoMinimo = async (req, res) =>{
    const {Monto} = req.body
    if(req.usuario){

        ModificarMontoMinimo(Monto);
        res.json({msg: "Sorteo agregado con exito", isSuccess: true})
       
    }
    else{
        res.sendStatus(401);
    }
}

//
exports.cloneTicket = async (req, res) =>{
    if(req.usuario){
        const {IdTicket} = req.body;
        cloneTicket(IdTicket)
        .then(response => {
            res.json(response);
        })
    }
    else{
        res.sendStatus(401);
    }
}

//VentasPorNumero
exports.VentasPorNumero = async (req, res) =>{
    if(req.usuario){
        const {SorteoID, Fecha, IdUser} = req.body;
        console.log({SorteoID, Fecha, IdUser})
        VentasPorNumero(IdUser, SorteoID, Fecha)
        .then(response => {
            res.json(response);
        })
    }
    else{
        res.sendStatus(401);
    }
}
exports.GetSorteoName = async (req, res) =>{
    if(req.usuario){
        const {SorteoID} = req.body;
        getSorteoName(SorteoID)
        .then(response => {
            res.json(response);
        })
    }
    else{
        res.sendStatus(401);
    }
}


exports.GetSorteosBySorteoID = async (req, res) =>{
    if(req.usuario){
        const {SorteoID, IdUser} = req.body;
        getSorteosBySorteoID(IdUser, SorteoID)
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
exports.GetLimiteSorteoPorUser = async (req, res) =>{
    if(req.usuario){
        const { userId } = req.body;
        getLimiteSorteoPorUser(userId).then(response=>{
            res.json(response)
        });
       
    }
    else{
        res.sendStatus(401);
    }
}
exports.getSorteoById = async (req, res) =>{
    if(req.usuario){
        const { id } = req.body;
        getSorteoById(id).then(response=>{
            res.json(response)
        });
        
    }
    else{
        res.sendStatus(401);
    }
} 
exports.GetIdTicket = async (req, res) =>{
    if(req.usuario){
        const { id } = req.body;
        GetIdTicket().then(response=>{
            res.json(response)
        });
       
    }
    else{
        res.sendStatus(401);
    }
} 
exports.GetNumerosDisponibles = async (req, res) =>{
    if(req.usuario){
        const { SorteoID, Fecha } = req.body;
        GetNumerosDisponibles(SorteoID, Fecha).then(response=>{
            res.json(response)
        });
       
    }
    else{
        res.sendStatus(401);
    }
}
//DisableSorteo
exports.DisableSorteo = async (req, res) =>{
    if(req.usuario){
        const { IdSorteo,Fecha  } = req.body;
        DisableSorteo(IdSorteo, Fecha);
        
        res.json({msg: "Sorteo agregado con exito", isSuccess: true})
    }
    else{
        res.sendStatus(401);
    } 
}
//GetMontoMinimoCompra
exports.GetMontoMinimoCompra = async (req, res) =>{
    if(req.usuario){
        GetMontoMinimoCompra().then(response=>{
                res.json(response)
            });
    } 
    else{
        res.sendStatus(401);
    }
}
exports.resumenGranTotal = async (req, res) =>{
    if(req.usuario){
        const { IdUser , Fecha } = req.body;
            resumenGranTotal(IdUser , Fecha).then(response=>{
                res.json(response)
            });
    } 
    else{
        res.sendStatus(401);
    }
}
//TODO: revisar
exports.ValidaCompraNumeros = async (req, res) =>{
    if(req.usuario){
        const { numeros } = req.body;
        numeros.map(item=>{
            const {IdSorteo , Fecha , IdUser , Numero , Monto, IdTicket} = item;
            const result = ValidaCompraNumero(IdSorteo , Fecha , req.usuario.idUsers, Numero , Monto, IdTicket).then(response=>{
                res.json(response)
            });
        }) 
        
    } 
    else{
        res.sendStatus(401);
    }
}
exports.CompraNumeros = async (req, res) =>{
    if(req.usuario){
        const { numeros } = req.body;
        numeros.map(item=>{
            const {IdSorteo , Fecha , IdUser , Numero , Monto, IdTicket} = item;
            compraNumero(IdSorteo , Fecha , req.usuario.idUsers , Numero , Monto, IdTicket);
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

