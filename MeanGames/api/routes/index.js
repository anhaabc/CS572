const express = require('express')
const routes = express.Router();
const gameController = require('../controller/GameController')
const userContoller = require('../controller/UsersController')

routes.route('/games')
    .get(gameController.getAllGames)
    .post(gameController.addOne);

routes.route('/games/:gameId')
    .get(gameController.getOneGame)
    .delete(gameController.deleteOne);

routes.route("/users").post(userContoller.register);
routes.route("/users/login").post(userContoller.login);

module.exports = routes;