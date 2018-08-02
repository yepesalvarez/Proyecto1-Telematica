'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var routeSchema = schema({
    fecha: String,
    points: [{ lat : Number, lon : Number}],
    user: {type: schema.ObjectId, ref : 'User'}
});

module.exports = mongoose.model('Route', routeSchema);