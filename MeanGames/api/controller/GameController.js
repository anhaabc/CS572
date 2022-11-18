const mongoose = require('mongoose');
const Game = mongoose.model(process.env.DB_PLAYER_MODEL);
const {_debugLog, _handleError, _sendResponse, _updateResponse} = require('./utils')

const _buildFindQuery = (req, res) => {
    let query = {};
    let minDist = (req.query && req.query.minDist) ? req.query.minDist : process.env.DEFAULT_GEO_MIN_DIST;
    let maxDist = (req.query && req.query.maxDist) ? req.query.maxDist : process.env.DEFAULT_GEO_MAX_DIST;

    if (req.query && req.query.lat && req.query.lng) {
        const lat = parseFloat(req.query.lat);
        const lng = parseFloat(req.query.lng);
        const point = {
            type: "Point",
            coordinates: [lng, lat]
        };
        query = {
            "publisher.location.coordinates": {
                $near: {
                    $geometry: point,
                    $maxDistance: parseFloat(maxDist),
                    $minDistance: parseFloat(minDist)
                }
            }
        };
    }

    return query;
};



const getAllGames = (req, res) => {
    let offset = (req.query && req.query.offset) ? req.query.offset : process.env.DEFAULT_OFFSET;
    let limit = (req.query && req.query.limit) ? req.query.limit : process.env.DEFAULT_LIMIT;

    const response = {};

    Game.find(_buildFindQuery(req, res))
        .skip(offset)
        .limit(limit)
        .then((game) => _checkGameExist(process.env.HTTP_STATUS_OK, game, response))
        .catch((err) => _handleError(err, response))
        .finally(() => _sendResponse(res, response));
};

const getOneGame = (req, res) => {

    const response = {};
    
    Game.findById(req.params.gameId)
        .then((game) => _checkGameExist(process.env.HTTP_STATUS_OK, game, response))
        .catch((err) => _handleError(err, response))
        .finally(() => _sendResponse(res, response));
        
};

const addOne = function(req, res) {
    
    const newGame = _buildNewGameObject(req);
    const response = {};

    Game.create(newGame)
        .then((game) => _checkGameExist(process.env.HTTP_STATUS_CREATED, game, response))
        .catch((err) => _handleError(err, response))
        .finally(() => _sendResponse(res, response));

};

const deleteOne = function(req, res) {
    _debugLog("deleteOne " + req.params.gameId);
    const response = {};

    Game.findByIdAndDelete(req.params.gameId)
        .then((deletedGame) => _checkGameExist(process.env.HTTP_STATUS_NO_CONTENT, deletedGame, response))
        .catch((err) => _handleError(err, response))
        .finally(() => _sendResponse(res, response));
};

///////////////////////////
// Internal functions

const _buildNewGameObject = (req) => {
    return {
        title: req.body.title,
        year: req.body.year,
        price: req.body.price,
        rate: req.body.rate,
    };
}

const _checkGameExist = (status, game, response) => {
    if (!game) {
        _updateResponse(response, process.env.HTTP_STATUS_NOT_FOUND, process.env.MSG_GAME_NOT_FOUND)
    } else {
        _updateResponse(response, status, game)
    }
}

module.exports = {
    getAllGames,
    getOneGame,
    addOne,
    deleteOne
}
