const express = require('express');
const router = express.Router({mergeParams: true});
const achievmentController = require('../controller/AchievmentController');

router
    .route("/")
    .get(achievmentController.getAllAchievments)
    .post(achievmentController.addOneAchievment);

router
    .route("/:achievmentId")
    .get(achievmentController.getOneAchievment)
    .put(achievmentController.updateOneAchievmentFull)
    .patch(achievmentController.updateOneAchievmentPartial)
    .delete(achievmentController.deleteOneAchievment);

module.exports = router;