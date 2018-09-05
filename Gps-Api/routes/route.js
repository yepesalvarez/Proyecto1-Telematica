'use strict'

var express = require ('express');
var routeController = require('../controllers/route');
var api = express.Router();
var middlewareAuth = require('../middlewares/authenticated')

api.get('/route/:id', middlewareAuth.ensureAuth, routeController.getRouteById);
api.post('/route', middlewareAuth.ensureAuth, routeController.saveRoute);
api.put('/route/:id', middlewareAuth.ensureAuth, routeController.updateRoute);
api.get('/route/user/:userId', middlewareAuth.ensureAuth, routeController.getRoutesByUser);

module.exports = api;