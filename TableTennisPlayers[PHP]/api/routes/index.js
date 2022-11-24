const express = require('express');
const router = express.Router();
const playerRoute = require('./player');
const loginRoute = require('./login')

router.use("/players", playerRoute)
router.use('/login', loginRoute);

module.exports = router;