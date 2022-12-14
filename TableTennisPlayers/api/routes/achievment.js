const express = require('express');
const router = express.Router({mergeParams: true});
const achievmentController = require('../controller/AchievmentController');
const authController = require('../controller/AuthenticationController')

router
    .route("/")
    .get(achievmentController.getAllAchievments)
    .post(authController.authenticate, achievmentController.addOneAchievment);

router
    .route("/:achievmentId")
    .get(achievmentController.getOneAchievment)
    .delete(authController.authenticate, achievmentController.deleteOneAchievment);

module.exports = router;