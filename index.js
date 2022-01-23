const express = require('express');
const cors = require('cors');
const http = require('http');
const { application } = require('express');
const app = express();
const server = http.createServer(app);


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

//init del server
server.listen(port, () => {
    console.log('listening on *:4000');
  });