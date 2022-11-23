const express = require('express');
const router = express.Router();
const playerController = require('../controller/PlayerController');
const achievmentRoute = require('./achievment');

router
    .route('/')
    .get(playerController.getAllPlayers)
    .post(playerController.addOnePlayer);

router
    .route('/:playerId')
    .get(playerController.getOnePlayer)
    .put(playerController.updateOnePlayerFull)
    .patch(playerController.updateOnePlayerPartial)
    .delete(playerController.deleteOnePlayer);

//Sub documents
router.use('/:playerId/achievments', achievmentRoute)


module.exports = router;