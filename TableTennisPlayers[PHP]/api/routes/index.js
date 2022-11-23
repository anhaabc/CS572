const express = require('express');
const router = express.Router();
const playerRoute = require('./player');

router.use("/players", playerRoute)

module.exports = router;