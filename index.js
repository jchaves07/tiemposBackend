const express = require('express');
const cors = require('cors');
const http = require('http');
const schedule = require('node-schedule');
const { application } = require('express');
const { CreateSorteos, validaTokens } = require('./config/db');
const app = express();
const server = http.createServer(app);

const job = schedule.scheduleJob('29 23 * * *', function(){
  CreateSorteos();
  console.log('Ejecucion de creacion de sorteos');
});
const job2 = schedule.scheduleJob('1 * * * * *', function(){
  validaTokens();
  console.log('Ejecucion de creacion de sorteos');
});
//puerto de la app
const port = process.env.PORT || 4000;
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//habilitar leer valores de body
app.use(express.json());
//Routes
app.use('/api/users',cors(corsOptions), require('./routes/usuarios'));
app.use('/api/auth', cors(corsOptions), require('./routes/auth'));
app.use('/api/general', cors(corsOptions), require('./routes/general'));
app.use('/api/sorteos', cors(corsOptions), require('./routes/sorteos'));




//init del server
server.listen(port, () => {
    console.log('listening on *:4000');
  });