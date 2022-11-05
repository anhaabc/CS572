const express = require('express');
const router = express.Router();
const playerController = require('../controller/PlayerController');
const achievmentController = require('../controller/AchievmentController');

router
    .route("/players")
    .get(playerController.getAllPlayers)
    .post(playerController.addOnePlayer);

router
    .route("/players/:team")
    .get(playerController.getOnePlayer)
    .put(playerController.updateOnePlayerFull)
    .delete(playerController.deleteOnePlayer);

//Sub documents
router
    .route("/players/:team/achievments")
    .get(achievmentController.getAllAchievments)
    .post(achievmentController.addOneAchievment);

router
    .route("/players/:team/achievments/:year")
    .get(achievmentController.getOneAchievment)
    .put(achievmentController.updateOneAchievment)
    .delete(achievmentController.deleteOneAchievment);


module.exports = router;