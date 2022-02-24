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
});
const job2 = schedule.scheduleJob('1 * * * * *', function(){
  validaTokens();
});
//puerto de la app
const port = process.env.PORT || 4000;
app.use(cors())

//habilitar leer valores de body
app.use(express.json());
app.options('*', cors())
app.use('/api/users', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/general', require('./routes/general'));
app.use('/api/sorteos', require('./routes/sorteos'));




//init del server
server.listen(port, () => {
    console.log('listening on *:4000');
  });