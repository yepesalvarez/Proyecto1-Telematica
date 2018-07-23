'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var pointSchema = schema({
    lat: Number,
    lon: Number,
    route: {type: schema.ObjectId, ref : 'Route'}
});

module.exports = mongoose.model('Point', pointSchema);