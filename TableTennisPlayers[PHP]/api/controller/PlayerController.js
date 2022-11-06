const mongoose = require('mongoose')
const Player = mongoose.model(process.env.DB_PLAYER_MODEL);

//GET /players
const getAllPlayers = (req, res) => {
    console.log("getAllPlayers() executed");

    Player.find().exec((err, player) => {
        const response = {
            status: process.env.HTTP_STATUS_OK,
            message: player
        };
        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            response.message = err;
        } else if(!player) {
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = {"message" : process.env.MSG_PLAYER_NOT_FOUND};
        }

        res.status(parseInt(response.status)).json(response.message);
    })
};

//GET /players/:playerId
const getOnePlayer = (req, res) => {
    console.log("getOnePlayer() executed");

    const playerId = req.params.playerId;
    
    //TODO - add objectID validation
    Player.findById(playerId).exec((err, player) => {
        const response = {
            status: process.env.HTTP_STATUS_OK,
            message: player
        };
        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            response.message = err;
        }
        res.status(parseInt(response.status)).json(response.message);
    });
    
};

//POST /players 
const addOnePlayer = (req, res) => {
    console.log("addOnePlayer() executed");

    const newPlayer = {
        name: req.body.name,
        country: req.body.country
    };
    Player.create(newPlayer, (err, player) => {
        const response = {
            status: process.env.HTTP_STATUS_OK,
            message: player
        };

        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            response.message = err;
        }

        res.status(parseInt(response.status)).json(response.message);
    })
}

//PUT /player/:playerId
const updateOnePlayerFull = (req, res) => {
    console.log("updateOnePlayerFull() executed");

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
    console.log("updateOnePlayerPartial() executed");

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
    console.log("deleteOnePlayer() executed");
    
    const playerId = req.params.playerId;
    Player
        .findByIdAndDelete(playerId)
        .exec((err, deletedPlayer) => {
            const response = {
                status: process.env.HTTP_STATUS_NO_CONTENT,
                message: deletedPlayer
            };

            if (err) {
                response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
                response.message = err;
            } else if (!deletedPlayer) {
                response.status = process.env.HTTP_STATUS_NOT_FOUND;
                response.message = {"message" : process.env.MSG_PLAYER_NOT_FOUND};
            }

            res.status(parseInt(response.status)).json(response.message);
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

