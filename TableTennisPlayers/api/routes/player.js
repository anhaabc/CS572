const express = require('express');
const router = express.Router();
const playerController = require('../controller/PlayerController');
const achievmentRoute = require('./achievment');
const authController = require('../controller/AuthenticationController')

router
    .route('/')
    .get(playerController.getAllPlayers)
    .post(playerController.addOnePlayer);

router
    .route('/:playerId')
    .get(playerController.getOnePlayer)
    .put(authController.authenticate, playerController.updateOnePlayerFull)
    .patch(authController.authenticate, playerController.updateOnePlayerPartial)
    .delete(authController.authenticate, playerController.deleteOnePlayer);
    
//Sub documents
router.use('/:playerId/achievments', achievmentRoute)

module.exports = router;