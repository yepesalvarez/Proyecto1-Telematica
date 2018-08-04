var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//Instancio el servidor
var app = express();

// set up the template engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

//set assets folder as public
app.use(express.static(path.join(__dirname,'./assets')));

//Cargar rutas
var userRoutes = require('./routes/user');
var routeRoutes = require('./routes/route');
var indexRoutes = require('./routes/index');

//Middleware que se ejecuta antes de ejecutar el codigo y recibe los parametros y los transforma en este caso en formato json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


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
app.use('/api', routeRoutes);
app.use('', indexRoutes);

//Para poder utilizar este archivo dentro de otros
module.exports = app;