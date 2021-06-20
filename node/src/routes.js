const express = require('express');

const routes = express.Router();

const FreteController = require('./app/controllers/FreteController');

// Rotas
// routes.use('/', 'conect');
routes.use('/', FreteController.routes());

module.exports = routes;
