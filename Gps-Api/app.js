var express = require('express');
var bodyParser = require('body-parser');

//Instancio el servidor
var app = express();

//Cargar rutas
var userRoutes = require('./routes/user');

//Middleware que se ejecuta antes de ejecutar el codigo y recibe los parametros y los transforma en este caso en formato json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//Configurar cabeceras Http
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE');
    next();
});

//Rutas base
app.use('/api', userRoutes);

//Para poder utilizar este archivo dentro de otros
module.exports = app;