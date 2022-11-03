const express = require('express')
const routes = express.Router();
const studentController = require('./../controller/StudentController')

routes.get('/students', studentController.getAllStudents);
routes.get('/students/:id', studentController.getOneStudent);

module.exports = routes;