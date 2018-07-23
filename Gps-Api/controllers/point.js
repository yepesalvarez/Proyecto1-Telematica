'use strict'

var Route = require ('../models/route');
var Point = require ('../models/point');

/*-----------------------------------------------------------------------------------------------------------------*/

function savePoint(req, res){
    var point = new Point();
    var params = req.body;

    if(!params.lat || !params.lon || !params.route){
        res.status(400).send({message : 'los parámetos de latitud (lat), longitud(lon) y id ruta (route) son obligatorios'})
    }else{
        point.lat = params.lat;
        point.lon = params.lon;
        point.route = params.route;
        point.save(function(err, pointStored){
            if(err){
                res.status(500).send({message : 'No se ha podido procesar solicitud, punto no guardado'});
            }else{
                if(!pointStored){
                    res.status(400).send({message : 'parámetros inválidos, revisar y reintentar'});
                }else{
                    //console.log(params.route);
                    Route.update(
                        { _id: params.route }, 
                        { $push: { points: pointStored } } );
                    res.status(200).send({point : pointStored});
                }
            }
        });
    }
}

/*-----------------------------------------------------------------------------------------------------------------*/

module.exports = {
    savePoint
};