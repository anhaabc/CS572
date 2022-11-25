const express = require('express');
const router = express.Router();
const loginController = require('../controller/LoginController');

router
    .route("/")
    .post(loginController.login);

module.exports = router;