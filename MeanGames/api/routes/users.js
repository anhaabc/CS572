const express = require('express')
const routes = express.Router();
const userContoller = require('../controller/UsersController')

routes.route("/")
    .get(userContoller.getAllUsers)
    .post(userContoller.register);

routes.route("/login").post(userContoller.login);

module.exports = routes;