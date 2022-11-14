const express = require('express');
const routes = express.Router();
const studentController = require('../controller/studentController')

routes.route('/students').get(studentController.getAll);

routes.route('/students/:id')
    .get(studentController.getOne)
    .delete(studentController.deleteOne);

module.exports = routes;

