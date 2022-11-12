const mongoose = require('mongoose');

const Game = mongoose.model(process.env.DB_PLAYER_MODEL);

const _buildFindQuery = (req, res) => {
    let query = {};
    let minDist = (req.query && req.query.minDist) ? req.query.minDist : process.env.DEFAULT_GEO_MIN_DIST;
    let maxDist = (req.query && req.query.maxDist) ? maxDist = req.query.maxDist : process.env.DEFAULT_GEO_MAX_DIST;

    if (req.query && req.query.lat && req.query.lng) {
        const lat = parseFloat(req.query.lat);
        const lng = parseFloat(req.query.lng);
        const point = {
            type: "Point",
            // coordinates: [lat, lng]
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



module.exports.getAllGames = (req, res) => {
    // console.log(req.query);
    let offset = (req.query && req.query.offset) ? req.query.offset : process.env.DEFAULT_OFFSET;
    let limit = (req.query && req.query.limit) ? req.query.limit : process.env.DEFAULT_LIMIT;

    Game.find(_buildFindQuery(req, res)).skip(offset).limit(limit).exec((err, game) => {
        const response = {
            status: process.env.HTTP_STATUS_OK,
            message: game
        };
        if (err) {
            console.log("err", err);
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            response.message = err;
        } else if (!game) {
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = {message: process.env.GAME_NOT_FOUND};
        }
        res.status(parseInt(response.status)).json(response.message);
    });
};

module.exports.getOneGame = (req, res) => {
    Game.findById(req.params.gameId).exec((err, game) => {
        const response = {
            status: process.env.HTTP_STATUS_OK,
            message: game
        };
        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            response.message = err;
        } else if (!game) {
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = {message: process.env.GAME_NOT_FOUND};
        }
        res.status(parseInt(response.status)).json(response.message);
    });
};

module.exports.addOne = function(req, res) {
    
    const newGame = {
        title: req.body.title,
        year: req.body.year,
        price: req.body.price,
        rate: req.body.rate,
    };

    Game.create(newGame, (err, game) => {
        const response = {
            status: process.env.HTTP_STATUS_OK,
            message: game
        };
        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            response.message = err;
        } else if (!game) {
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = {message: process.env.GAME_NOT_FOUND};
        }
        res.status(parseInt(response.status)).json(response.message);
    });

};


module.exports.deleteOne = function(req, res) {
    console.log("deleteOne", req.params.gameId);
    Game.findByIdAndDelete(req.params.gameId).exec((err, deletedGame) => {
        const response = {
            status: process.env.HTTP_STATUS_NO_CONTENT,
            message: deletedGame
        };

        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            response.message = err;
        } else if (!deletedGame) {
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = {message : process.env.GAME_NOT_FOUND};
        }

        res.status(parseInt(response.status)).json(response.message);
    });
};