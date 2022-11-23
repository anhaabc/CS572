const mongoose = require('mongoose')
const Player = mongoose.model(process.env.DB_PLAYER_MODEL);
const utils = require('./Utilities');

const _checkAndUpdateResponse = (obj, result, response) => {
    if(!obj) {
        utils._updateResponse(process.env.HTTP_STATUS_NOT_FOUND ,{"message" : process.env.MSG_PLAYER_NOT_FOUND}, response);
    } else {
        utils._updateResponse(process.env.HTTP_STATUS_OK, result, response);
    }
}

//GET /players/:playerId/achievments
const getAllAchievments = (req, res) => {
    utils._debugLog("getAllAchievments() executed");

    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_OK, []);

    Player.findById(req.params.playerId)
        .then(player => _checkAndUpdateResponse(player, player.achievments, response))
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));
};

//GET /players/:playerId/achievments/:achievmentId
const getOneAchievment = (req, res) => {
    utils._debugLog("getOneAchievment() executed");

    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_OK, []);

    Player.findById(req.params.playerId)
        .then(player => _checkAndUpdateResponse(player, player.achievments.id(req.params.achievmentId)))
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));

};

//POST /players/:playerId/achievments
const addOneAchievment = (req, res) => {
    console.log("getAllAchievments() executed");

    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_NO_CONTENT, []);

    const playerId = req.params.playerId;
    Player
        .findById(playerId)
        .select(process.env.DB_PLAYER_SUB_ACHIEVMENTS)
        .then(player => {
            if(!player) {
                response.status = process.env.HTTP_STATUS_NOT_FOUND;
                response.message = {"message" : process.env.MSG_PLAYER_NOT_FOUND};
            } 

            if (response.status !== process.env.HTTP_STATUS_NO_CONTENT) {
                res.status(parseInt(response.status)).json(response.message);
            } else {
                const achievment = {
                    contest: req.body.contest,
                    medal: req.body.medal
                };

                player.achievments.push(achievment);

                player.save((err, savedPlayer) => {
                    if (err) {
                        response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
                        response.message = err;
                    } else {
                        response.status = process.env.HTTP_STATUS_OK;
                        response.message = savedPlayer;
                    }
                    res.status(parseInt(response.status)).json(response.message);
                });

            }
        })
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));

};

//PUT /players/:playerId/achievments/:achievmentId
const updateOneAchievmentFull = (req, res) => {
    console.log("updateOneAchievmentFull() executed");

    const playerId = req.params.playerId;
    const achievmentId = req.params.achievmentId;

    Player.findById(playerId).exec((err, player) => {
        const response = {
            status: process.env.HTTP_STATUS_NO_CONTENT,
            message: player.achievments
        };

        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            response.message = err;
        } else if(!player) {
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = {"message" : process.env.MSG_PLAYER_NOT_FOUND};
        }

        if (response.status !== process.env.HTTP_STATUS_NO_CONTENT) {
            res.status(parseInt(response.status)).json(response.message);
        } else {
            const achievment = player.achievments.id(achievmentId);
            achievment.contest = req.body.contest;
            achievment.medal = req.body.medal;
            player.save((err, savedPlayer) => {
                if (err) {
                    response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
                    response.message = err;
                } else {
                    response.status = process.env.HTTP_STATUS_OK;
                    response.message = savedPlayer.achievments.id(achievmentId);
                }

                res.status(parseInt(response.status)).json(response.message);
            });
        }
        
    });
};

//PATCH /players/:playerId/achievments/:achievmentId
const updateOneAchievmentPartial = (req, res) => {
    console.log("updateOneAchievmentPartial() executed");

    const playerId = req.params.playerId;
    const achievmentId = req.params.achievmentId;
    Player.findById(playerId).exec((err, player) => {
        const response = {
            status: process.env.HTTP_STATUS_NO_CONTENT,
            message: player.achievments
        };

        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            response.message = err;
        } else if(!player) {
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = {"message" : process.env.MSG_PLAYER_NOT_FOUND};
        }

        if (response.status !== process.env.HTTP_STATUS_NO_CONTENT) {
            res.status(parseInt(response.status)).json(response.message);
        } else {
            const achievment = player.achievments.id(achievmentId);
            if (req.body.contest)
                achievment.contest = req.body.contest;
            if (req.body.medal)
                achievment.medal = req.body.medal;
            player.save((err, savedPlayer) => {
                if (err) {
                    response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
                    response.message = err;
                } else {
                    response.status = process.env.HTTP_STATUS_OK;
                    response.message = savedPlayer.achievments.id(achievmentId);
                }

                res.status(parseInt(response.status)).json(response.message);
            });
        }
        
    });
};

//DELETE /players/:playerId/achievments/:achievmentId
const deleteOneAchievment = (req, res) => {
    console.log("deleteOneAchievment() executed");

    const playerId = req.params.playerId;
    const achievmentId = req.params.achievmentId;

    Player
        .findById(playerId)
        .select(process.env.DB_PLAYER_SUB_ACHIEVMENTS)
        .exec((err, player) => {
            const response = {
                status: process.env.HTTP_STATUS_NO_CONTENT,
                message: player
            };

            if (err) {
                response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
                response.message = err;
            } else if (!player) {
                response.status = process.env.HTTP_STATUS_NOT_FOUND;
                response.message = {"message" : process.env.MSG_PLAYER_NOT_FOUND};
            }

            if (response.status !== process.env.HTTP_STATUS_NO_CONTENT) {
                res.status(parseInt(response.status)).json(response.message);
            } else {
                const achievment = player.achievments.id(achievmentId);
                console.log("deleting object: ", achievment);

                if (achievment)
                    achievment.remove();

                player.save((err, savedPlayer) => {
                    if (err) {
                        response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
                        response.message = err;
                    } else {
                        response.message = savedPlayer.achievments;
                    }
                    res.status(parseInt(response.status)).json(response.message);
                });
            }
        });

};

module.exports = {
    getAllAchievments,
    getOneAchievment,
    addOneAchievment,
    updateOneAchievmentFull,
    updateOneAchievmentPartial,
    deleteOneAchievment
};