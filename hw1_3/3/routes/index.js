const express = require('express')
const routes = express.Router();
const gameController = require('./../controller/GameController')

routes.get('/');

module.exports = routes;