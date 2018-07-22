'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var routeSchema = schema({
    fecha: String,
    user: {type: Schema.ObjectId, ref : 'User'}
});

module.exports = mongoose.model('Route', routeSchema);