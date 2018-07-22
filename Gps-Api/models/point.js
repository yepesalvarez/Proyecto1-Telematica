'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var pointSchema = schema({
    lat: Number,
    lon: Number,
    route: {type: Schema.ObjectId, ref : 'Route'}
});

module.exports = mongoose.model('Point', pointSchema);