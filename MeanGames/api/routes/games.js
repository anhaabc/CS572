const express = require('express')
const routes = express.Router();
const gameController = require('../controller/GameController')
const authController = require('../controller/AuthenticationController')

routes.route('/')
    .get(gameController.getAllGames)
    .post(gameController.addOne);

routes.route('/:gameId')
    .get(authController.authenticate, gameController.getOneGame)
    .delete(gameController.deleteOne);

module.exports = routes;