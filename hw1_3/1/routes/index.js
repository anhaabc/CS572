const express = require('express');
const router = express.Router();

const jsonController = require('../controller/JsonController');

router.route('/').post(jsonController);

module.exports = router;