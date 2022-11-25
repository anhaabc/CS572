const mongoose = require('mongoose');
const Player = mongoose.model(process.env.DB_PLAYER_MODEL);
const utils = require('./Utilities');
const bcrypt = require('bcrypt');

//GET /players
const getAllPlayers = (req, res) => {
    utils._debugLog(getAllPlayers.name + process.env.MSG_FUNCTION_EXECUTING)
    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_OK, []);
    let offset = parseInt(process.env.DEFAULT_OFFSET, 10);
    let count = parseInt(process.env.DEFAULT_COUNT, 10);
    let maxCount = parseInt(process.env.DEFAULT_MAX_COUNT, 10);
    let query = {};
    if (req.query && req.query.offset)
        offset = req.query.offset;
    if (req.query && req.query.count)
        count = Math.min(maxCount, req.query.count);
    if (req.query && req.query.name)
        query = {name: req.query.name};
    
    Player.find(query).skip(offset).limit(count)
        .then(player => utils._checkPlayerAndUpdateResponse(player, player, response))
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));

};

//GET /players/:playerId
const getOnePlayer = (req, res) => {
    utils._debugLog(getOnePlayer.name + process.env.MSG_FUNCTION_EXECUTING)
    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_OK, []);
    Player.findById(req.params.playerId)
        .then(player => utils._checkPlayerAndUpdateResponse(player, player, response))
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));
};

//POST /players 
const addOnePlayer = (req, res) => {
    utils._debugLog(addOnePlayer.name + process.env.MSG_FUNCTION_EXECUTING)
    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_OK, []);
    bcrypt.genSalt(parseInt(process.env.NUMBER_OF_ROUNDS))
        .then(salt => _hashPassword(req.body.password, salt))
        .then(passwordHash => _createPlayer(req, passwordHash))
        .then(player => utils._updateResponse(process.env.HTTP_STATUS_OK, player, response))
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));
}

//PUT /player/:playerId
const updateOnePlayerFull = (req, res) => {
    utils._debugLog(updateOnePlayerFull.name + process.env.MSG_FUNCTION_EXECUTING)
    _updatePlayer(req, res, false);
}

//PATCH /players/:playerId
const updateOnePlayerPartial = (req, res) => {
    utils._debugLog(updateOnePlayerPartial.name + process.env.MSG_FUNCTION_EXECUTING)
    _updatePlayer(req, res, true);
}

//DELETE /players/:playerId
const deleteOnePlayer = (req, res) => {
    utils._debugLog(deleteOnePlayer.name + process.env.MSG_FUNCTION_EXECUTING)
    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_NO_CONTENT, []);
    Player.findByIdAndDelete(req.params.playerId)
        .then(deletedPlayer => _checkPlayer(deletedPlayer, response))
        .then(deletedPlayer => utils._debugLog(deleteOnePlayer.name + process.env.MSG_FUNCTION_SUCCESSFUL))
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));
}


//* Player related functions */

const _updatePlayer = (req, res, isPartial) => {
    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_NO_CONTENT, []);
    Player
        .findById(req.params.playerId)
        .then(player => _checkPlayer(player, response))
        .then(player => _savePlayer(req, player, response, isPartial))
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));
}

const _updatePlayerObject = (req, player, isPartial) => {
    if (isPartial) {
        if (req.body.name) player.name = req.body.name;
        if (req.body.country) player.country = req.body.country;
    } else {
        player.name = req.body.name;
        player.country = req.body.country;
    }
}

const _savePlayer = (req, player, response, isPartial) => {
    return new Promise((resolve, reject) => {

        _updatePlayerObject(req, player, isPartial)
        
        player.save((err, updatedPlayer) => {
            if (err) {
                utils._updateResponse(process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, err, response);
                reject();
            } else {
                utils._updateResponse(process.env.HTTP_STATUS_OK, updatedPlayer, response);
                resolve(player);
            }
        });

    });
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

const _createNewPlayerObject = (req, passwordHash) => {
    return {
        username: req.body.username,
        password: passwordHash,
        name: req.body.name,
        country: req.body.country
    };
}

const _hashPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt)
                .then(passwordHash => resolve(passwordHash))
                .catch(err => reject())
    })
}

const _createPlayer = (req, passwordHash) => {
    return new Promise((resolve, reject) => {
        const newPlayer = _createNewPlayerObject(req, passwordHash);
        Player.create(newPlayer)
            .then(player => resolve(player))
            .catch(err => reject());
    });
}

module.exports = {
    getAllPlayers,
    getOnePlayer,
    addOnePlayer,
    updateOnePlayerFull,
    updateOnePlayerPartial,
    deleteOnePlayer
};

