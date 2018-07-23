'use strict'

var express = require ('express');
var pointController = require('../controllers/point');
var api = express.Router();
var middlewareAuth = require('../middlewares/authenticated')

api.post('/point', middlewareAuth.ensureAuth, pointController.savePoint);

module.exports = api;