const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByUsername, saveToken } = require('../config/db');
require('dotenv').config({ path: 'variables.env' })
exports.authUser = async (req, res, next) => {
    if (req.error) {
        res.send({ msg: req.error, error: "300" });
    }
    else {
        const { username, password } = req.body;
        //obtiene user de base de datos
        getUserByUsername(username).then(response => {
            //valida password 
            if (bcrypt.compareSync(password, response.Password)) {
                //crear JWT
                const token = jwt.sign({
                    idUsers: response.idUsers,
                    Username: response.Username,
                    Type: response.Type,
                    Fullname: response.Fullname,
                    AgregarUsuario: response.AgregarUsuario,
                    LimitesUsuario: response.LimitesUsuario,
                    AgregarSaldo: response.AgregarSaldo,
                    EditarSorteo: response.EditarSorteo,
                    DeclaraGanador: response.DeclaraGanador,
                    MontoMinimo: response.MontoMinimo,
                    LimiteSorteo: response.LimiteSorteo,
                    Permisos: response.Permisos,
                    AnularSorteo: response.AnularSorteo,
                    AnularTicket: response.AnularTicket,
                    CambiarPassword: response.CambiarPassword,
                    BorrarSorteos: response.BorrarSorteos,
                    AgregarSorteos: response.AgregarSorteos,
                    DeshabilitarNumeros: response.DeshabilitarNumeros,
                    AgentParent: response.AgentParent
                }, process.env.SECRET, { expiresIn: '15m' });
                saveToken(response.idUsers, token);
                res.send({ token });
            }
            else {
                res.status(401).send({ msg: 'usuario o password invalidos' });
                next();
            }
        });
    }




}
exports.UserSigned = async (req, res) => {
    res.json({ usuario: req.usuario })
}