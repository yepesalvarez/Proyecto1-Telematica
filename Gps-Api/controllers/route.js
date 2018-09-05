'use strict'

var User = require ('../models/user');
var Route = require ('../models/route');

/*-----------------------------------------------------------------------------------------------------------------*/

function getRouteById(req, res){
    var routeId = req.params.id;
    Route.findById(routeId).populate({path : 'user'}).exec(function(err, route){
        if(err)
            res.status(500).send({message: err});
        if(!route)
            res.status(404).send({message: `No se ha encontrado ruta con id ${routeId}`});
        res.status(200).send({route});
    });
}

/*-----------------------------------------------------------------------------------------------------------------*/

function getRoutesByUser(req, res){
    var userId = req.params.userId;
    Route.find({user:userId}, function(err,routes){
        if(err){
            console.log(err);
            res.status(500).send({message: err});
        }else{
            //console.log(routes);
            res.status(200).send({routes});
        }
    });
}

/*-----------------------------------------------------------------------------------------------------------------*/

function saveRoute(req, res){
    var route = new Route();
    var params = req.body;

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

function updateRoute(req, res){
    var routeId = req.params.id;

    var update = req.body.route;

    Route.findByIdAndUpdate(routeId, update, function (err, routeUpdated){
        if(err){
            res.status(500).send({message:'No se ha podido procesar la solicitud, ruta no actualizada'});
        }else{
            if(!routeUpdated){
                res.status(400).send({message : 'parámetros inválidos para realizar la actualización'});
            }else{
                res.status(200).send({route : routeUpdated});
            }
        }
    });
}

/*-----------------------------------------------------------------------------------------------------------------*/

module.exports = {
    getRouteById,
    saveRoute,
    updateRoute, 
    getRoutesByUser
};