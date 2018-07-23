'use strict'

var User = require ('../models/user');
var bcrypt = require ('bcrypt-nodejs') ;
var jwt = require ('../services/jwt');

/*-----------------------------------------------------------------------------------------------------------------*/

function getUsers(req, res){
    User.find({}).exec(function (err, users){
        if(err)
            res.status(500).send({'menssage': 'Error al consultar usuarios'});
        if(!users)
            res.status(404).send({'menssage': 'No se han encontrado usuarios'});
        res.status(200).send({users});
    });
}

/*-----------------------------------------------------------------------------------------------------------------*/

function getUserById(req, res){
    var userId = req.params.id;
    User.findById(userId, function(err, user){
        if(err)
            res.status(500).send({message: err});
        if(!user)
            res.status(404).send({message: `No se ha encontrado usuario con id ${userId}`});
        res.status(200).send({user});
    })
}

/*-----------------------------------------------------------------------------------------------------------------*/

function saveUser(req, res){
    var user = new User();
    var params = req.body;

    if(!params.username || !params.password){
        res.status(400).send({message: 'ambos campos (username y password) son obligatorios de diligenciarse'})
    }else{
        User.findOne({username : params.username}, function (err, userFound){
        if(err){
            res.status(500).send({message:'Se ha producido un error al intentar procesar la solicitud'});
        }else{
            if(!userFound){  
                user.username = params.username;
                bcrypt.hash(params.password, null, null, function (err, hash){
                    user.password = hash;
                    user.save(function(err, userStored){
                        if(err){
                            res.status(500).send({message: err});
                        }else{
                            res.status(200).send({user : userStored});
                        }
                    });
                });  
            }else{
                res.status(409).send({message:'El usuario que intenta crear ya existe en el sistema'});
            }
        }});
    }
}

/*-----------------------------------------------------------------------------------------------------------------*/

function loginUser(req, res){
    var params = req.body;

    if(!params.username || !params.password){
        res.status(400).send({message: 'ambos campos (username y password) son obligatorios de diligenciarse'})
    }else{
        User.findOne({username : params.username}, function (err, user){
            if(err){
                res.status(500).send({message:'Se ha producido un error al intentar procesar la solicitud'});
            }else{
                if(!user){
                    res.status(404).send({message: 'usuario no existe en el sistema'});
                }else{
                    bcrypt.compare(params.password, user.password, function(err, check){
                        if(check){
                            //Se retornan datos de usuario
                            if(params.gethash){
                                //devolver token jwt
                                res.status(200).send({
                                    token: jwt.createToken(user)
                                })
                            }else{
                                res.status(200).send({user});
                            }
                        }else{
                            res.status(400).send({message: 'contraseña incorrecta'});
                        }
                    });
                }
            }
        });
    }
}

/*-----------------------------------------------------------------------------------------------------------------*/

module.exports = {
    getUsers,
    getUserById,
    saveUser,
    loginUser
};

