const mongoose = require('mongoose');
const Player = mongoose.model(process.env.DB_PLAYER_MODEL);
const utils = require('./Utilities');

//////////
const _createNewPlayerObject = (req) => {
    return {
        name: req.body.name,
        country: req.body.country
    };
}

//GET /players
const getAllPlayers = (req, res) => {
    utils._debugLog("getAllPlayers() executed");

    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_OK, []);

    Player.find()
        .then(player => response.message = player)
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));

};

//GET /players/:playerId
const getOnePlayer = (req, res) => {
    utils._debugLog("getOnePlayer() executed");

    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_OK, []);

    Player.findById(req.params.playerId)
        .then(player => response.message = player)
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));
};

//POST /players 
const addOnePlayer = (req, res) => {
    utils._debugLog("addOnePlayer() executed");

    const newPlayer = _createNewPlayerObject(req);
    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_OK, []);

    Player.create(newPlayer)
        .then(player => response.message = player)
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));
}

//PUT /player/:playerId
const updateOnePlayerFull = (req, res) => {
    utils._debugLog("updateOnePlayerFull() executed");

    const playerId = req.params.playerId;

    Player
        .findById(playerId)
        .select(process.env.DB_PLAYER_COLLECTION)
        .exec((err, player) => {
            const response = {
                status: process.env.HTTP_STATUS_NO_CONTENT,
                message: player
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
                player.name = req.body.name;
                player.country = req.body.country;
                player.save((err, updatedPlayer) => {
                    console.log("put player save()");
                    console.log(updatedPlayer);
                    if (err) {
                        response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
                        response.message = err;
                    } else {
                        response.status = process.env.HTTP_STATUS_OK;
                        response.message = updatedPlayer;
                    }
                    res.status(parseInt(response.status)).json(response.message);
                });
            }

        });
}

//PATCH /players/:playerId
const updateOnePlayerPartial = (req, res) => {
    utils._debugLog("updateOnePlayerPartial() executed");

    const playerId = req.params.playerId;

    Player
        .findById(playerId)
        .select(process.env.DB_PLAYER_COLLECTION)
        .exec((err, player) => {
            const response = {
                status: process.env.HTTP_STATUS_NO_CONTENT,
                message: player
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
                if (req.body.name)
                    player.name = req.body.name;
                if (req.body.country)
                    player.country = req.body.country;

                player.save((err, updatedPlayer) => {
                    if (err) {
                        response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
                        response.message = err;
                    } else {
                        response.status = process.env.HTTP_STATUS_OK;
                        response.message = updatedPlayer;
                    }
                    res.status(parseInt(response.status)).json(response.message);
                });
            }

        });
}

//DELETE /players/:playerId
const deleteOnePlayer = (req, res) => {
    utils._debugLog("deleteOnePlayer() executed");
    
    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_NO_CONTENT, []);

    Player.findByIdAndDelete(req.params.playerId)
        .then(deletedPlayer => {
            if (!deletedPlayer)
                utils._updateResponse(process.env.HTTP_STATUS_NOT_FOUND, {"message" : process.env.MSG_PLAYER_NOT_FOUND})
        })
        .catch(err => utils._handleError(err, response))
        .finally(() => utils._sendResponse(res, response));
}

module.exports = {
    getAllPlayers,
    getOnePlayer,
    addOnePlayer,
    updateOnePlayerFull,
    updateOnePlayerPartial,
    deleteOnePlayer
};

