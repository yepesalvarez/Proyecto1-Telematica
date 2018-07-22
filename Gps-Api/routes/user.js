'use strict'

var express = require ('express');
var userController = require('../controllers/user');
var api = express.Router();

api.get('/user', userController.getUsers);
api.get('/user/:id',userController.getUserById);
api.post('/user/register', userController.saveUser)

module.exports = api;