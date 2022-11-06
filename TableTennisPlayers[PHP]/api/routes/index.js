const express = require('express');
const router = express.Router();
const playerController = require('../controller/PlayerController');
const achievmentController = require('../controller/AchievmentController');

router
    .route("/players")
    .get(playerController.getAllPlayers)
    .post(playerController.addOnePlayer);

router
    .route("/players/:playerId")
    .get(playerController.getOnePlayer)
    .put(playerController.updateOnePlayerFull)
    .patch(playerController.updateOnePlayerPartial)
    .delete(playerController.deleteOnePlayer);

//Sub documents
router
    .route("/players/:playerId/achievments")
    .get(achievmentController.getAllAchievments)
    .post(achievmentController.addOneAchievment);

router
    .route("/players/:playerId/achievments/:achievmentId")
    .get(achievmentController.getOneAchievment)
    .put(achievmentController.updateOneAchievmentFull)
    .patch(achievmentController.updateOneAchievmentPartial)
    .delete(achievmentController.deleteOneAchievment);


module.exports = router;