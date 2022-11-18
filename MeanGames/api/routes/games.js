const express = require('express')
const routes = express.Router();
const gameController = require('../controller/GameController')

routes.route('/')
    .get(gameController.getAllGames)
    .post(gameController.addOne);

routes.route('/:gameId')
    .get(gameController.getOneGame)
    .delete(gameController.deleteOne);

module.exports = routes;