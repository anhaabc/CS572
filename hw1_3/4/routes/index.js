const express = require('express')
const routes = express.Router();
const calculation = require('./../controller/CalculationController')

routes.get('/:num', calculation);

module.exports = routes;