var express = require('express');
var UserController = require('../controllers/user');
var api = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get('/user', UserController.getAll);
api.get('/user/:userId', UserController.findOne);
api.post('/user', UserController.addUser);
api.put('/user/:userId', UserController.updateUser);
api.delete('/user/:userId', UserController.deleteUser);
// Exportamos la configuración
module.exports = api;