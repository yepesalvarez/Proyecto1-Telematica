'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8080;

//Para eliminar el aviso de mongoose que devuelve por la consola
mongoose.Promise = global.Promise;

//Conexión con Bd
mongoose.connect('mongodb://localhost:27017/gpsDb', function (err, res) {
    if(err){
        throw err;
    }else{
        console.log('conexión con base de datos mongo exitosa');
        app.listen(port, function(){
            console.log(`Servidor Api Restful corriendo en ${port}`)
        });
    }
});