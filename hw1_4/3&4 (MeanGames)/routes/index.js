const express = require('express')
const routes = express.Router();
const gameController = require('../api/controller/GameController')

routes.get('/games', gameController.getAllGames);
routes.post('/games', gameController.addOne);
routes.get('/games/:gameId', gameController.getOneGame);
routes.delete('/games/:gameId', gameController.deleteOne);

module.exports = routes;