const mongoose = require('mongoose');
const Player = mongoose.model(process.env.DB_PLAYER_MODEL);
const utils = require('./Utilities');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = (req, res) => {
    utils._debugLog("login");
    utils._debugLog(req.body);

    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_OK, {});

    Player.findOne({username: req.body.username})
        .then(player => _checkPlayerExist(process.env.HTTP_STATUS_OK, player, response))
        .then(player => _checkPasswordMatch(req.body.password, player))
        .then(token => utils._updateResponse(process.env.HTTP_STATUS_OK, {success: true, token: token}, response))
        .then(() => utils._debugLog("login successful"))
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));
}

/* Login related functions */

const _checkPasswordMatch = (plainPassword, player) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, player.password, (err, passwordMatch) => {
            if (passwordMatch) {
                const token = jwt.sign({ playerId: player._id }, process.env.JWT_PASS, {
                    expiresIn: 3600,
                });
                resolve(token);
            } else {
                utils._debugLog("pass not match");
                utils._debugLog(err);
                reject(err);
            }
        });
    })
}

const _checkPlayerExist = (statusOk, player, response) => {
    return new Promise((resolve, reject) => {
        if (!player) {
            utils._updateResponse(process.env.HTTP_STATUS_NOT_FOUND, process.env.MSG_USER_OR_PASS_WRONG, response)
            utils._debugLog("player not exists");
            reject(response.message);
        } else {
            utils._updateResponse(statusOk, player, response)
            resolve(player);
        }
    });
}

module.exports = {
    login
}