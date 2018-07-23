'use strict'

var jwt = require ('jwt-simple');
var moment = require('moment');

var secret = 'st0263_topicos_telematica';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        username: user.username,
        //fecha de creación del token
        iat: moment().unix(),
        //fecha de expiración del token
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
}