const express = require('express')
const routes = express.Router();
const gamesRouter = require('./games')
const usersRouter = require('./users')

routes.use('/games', gamesRouter)
routes.use("/users", usersRouter)

module.exports = routes;