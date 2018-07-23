'use strict'

var User = require ('../models/user');
var Route = require ('../models/route');
var Point = require ('../models/point');

/*-----------------------------------------------------------------------------------------------------------------*/

function getRouteById(req, res){
    var routeId = req.params.id;
    Route.findById(routeId).populate({path : 'user'}).populate({path : 'point'}).exec(function(err, route){
        if(err)
            res.status(500).send({message: err});
        if(!route)
            res.status(404).send({message: `No se ha encontrado ruta con id ${routeId}`});
        res.status(200).send({route});
    });
}

/*-----------------------------------------------------------------------------------------------------------------*/

function saveRoute(req, res){
    var route = new Route();
    var params = req.body;

    console.log(params);

    if(!params.fecha || !params.user){
        res.status(400).send({message : 'parámetros incompletos'})
    }else{
        route.fecha = params.fecha;
        route.user = params.user;
        route.save(function(err, routeStored){
            if(err){
                res.status(500).send({message: 'Error al procesar la solicitud'});
            }else{
                if(!routeStored){
                    res.status(400).send({message : 'parámetros inválidos, no se ha guardado la ruta'});
                }else{
                    res.status(200).send({route : routeStored});
                }
            }
        });
    }
}

/*-----------------------------------------------------------------------------------------------------------------*/

module.exports = {
    getRouteById,
    saveRoute
};