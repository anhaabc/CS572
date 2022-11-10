const mongoose = require('mongoose');

const Game = mongoose.model(process.env.DB_PLAYER_MODEL);

module.exports.getAllGames = (req, res) => {
    //TODO - api hardening, env http status
    Game.find().exec((err, game) => {
        const response = {
            status: process.env.HTTP_STATUS_OK,
            message: game
        };
        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            response.message = err;
        } else if (!game) {
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = {message: "Game not found"};
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
            response.message = {message: "Game not found"};
        }
        res.status(parseInt(response.status)).json(response.message);
    });
};

module.exports.addOne = function(req, res) {
    //TODO

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
            response.message = {"message" : "Game not found"};
        }

        res.status(parseInt(response.status)).json(response.message);
    });
};