const express = require('express')
const routes = express.Router();
const gameController = require('./../controller/GameController')

routes.get('/games', gameController.getAllGames);
routes.get('/games/:id', gameController.getOneGame);

module.exports = routes;