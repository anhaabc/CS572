const mongoose = require('mongoose')
const Player = mongoose.model(process.env.DB_PLAYER_MODEL);
const utils = require('./Utilities');

//GET /players/:playerId/achievments
const getAllAchievments = (req, res) => {
    utils._debugLog(getAllAchievments.name + process.env.MSG_FUNCTION_EXECUTING)
    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_OK, []);
    Player.findById(req.params.playerId)
        .then(player => utils._checkPlayerAndUpdateResponse(player, player.achievments, response))
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));
};

//GET /players/:playerId/achievments/:achievmentId
const getOneAchievment = (req, res) => {
    utils._debugLog(getOneAchievment.name + process.env.MSG_FUNCTION_EXECUTING)
    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_OK, []);
    Player.findById(req.params.playerId)
        .then(player => utils._checkPlayerAndUpdateResponse(player, player.achievments.id(req.params.achievmentId), response))
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));
};

//POST /players/:playerId/achievments
const addOneAchievment = (req, res) => {
    utils._debugLog(addOneAchievment.name + process.env.MSG_FUNCTION_EXECUTING)
    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_NO_CONTENT, []);
    Player
        .findById(req.params.playerId)
        .select(process.env.DB_PLAYER_SUB_ACHIEVMENTS)
        .then(player => _checkPlayer(player, response))
        .then(player => _saveAchievment(req, player, response))
        .then(player => utils._debugLog(player))
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));

};

//DELETE /players/:playerId/achievments/:achievmentId
const deleteOneAchievment = (req, res) => {
    utils._debugLog(deleteOneAchievment.name + process.env.MSG_FUNCTION_EXECUTING)
    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_NO_CONTENT, []);
    Player
        .findById(req.params.playerId)
        .then(player => _checkPlayer(player, response))
        .then(player => _deleteAndSavePlayer(req, player, response))
        .then(player => utils._debugLog(deleteOneAchievment.name + process.env.MSG_FUNCTION_SUCCESSFUL))
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));
};

/* Internal */

const _deleteAndSavePlayer = (req, player, response) => {
    return new Promise((resolve, reject) => {
        const achievment = player.achievments.id(req.params.achievmentId);
        if (achievment)
            achievment.remove();
        player.save((err, updatedPlayer) => {
            if (err) {
                utils._updateResponse(process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, err, response);
                reject();
            } else {
                utils._updateResponse(process.env.HTTP_STATUS_OK, updatedPlayer.achievments, response);
                resolve(updatedPlayer.achievments);
            }
        });

    });
}

const _saveAchievment = (req, player, response) => {
    return new Promise((resolve, reject) => {
        player.achievments.push({
            contest: req.body.contest,
            medal: req.body.medal
        });
        player.save((err, savedPlayer) => {
            if (err) {
                reject(err);
            } else {
                utils._updateResponse(process.env.HTTP_STATUS_OK, savedPlayer.achievments, response);
                resolve(player);
            }
        });
    })

}

const _checkPlayer = (player, response) => {
    return new Promise((resolve, reject) => {
        if (!player) {
            utils._updateResponse(process.env.HTTP_STATUS_NOT_FOUND, {message : process.env.MSG_PLAYER_NOT_FOUND}, response);
            reject();
        } else {
            resolve(player);
        }
    })
}

module.exports = {
    getAllAchievments,
    getOneAchievment,
    addOneAchievment,
    deleteOneAchievment
};