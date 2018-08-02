'use strict'

function welcome(req, res){
    res.render('index', { title: 'Ingreso - Sistema GPS' });
}

function register(req,res){
    res.render('register', { title: 'Registro - Sistema GPS' });
}

module.exports = {
    welcome,
    register
}