'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var routeSchema = schema({
    fecha: String,
    userAuth0 : String,
    points: [{ lat : Number, lon : Number}],
});

module.exports = mongoose.model('Route', routeSchema);