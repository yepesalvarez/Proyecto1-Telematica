'use strict'

var express = require('express');
var indexController = require('../controllers/index');
var api = express.Router();

api.get('/', indexController.welcome);

module.exports = api;