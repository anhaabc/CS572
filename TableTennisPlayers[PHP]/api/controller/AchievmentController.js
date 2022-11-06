const mongoose = require('mongoose')
const Player = mongoose.model(process.env.DB_PLAYER_MODEL);

//GET /players/:playerId/achievments
const getAllAchievments = (req, res) => {
    console.log("getAllAchievments() executed");

    const playerId = req.params.playerId;
    Player
        .findById(playerId)
        .select(process.env.DB_PLAYER_SUB_ACHIEVMENTS)
        .exec((err, player) => {
            const response = {
                status: process.env.HTTP_STATUS_OK,
                message: player.achievments
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

//GET /players/:playerId/achievments/:achievmentId
const getOneAchievment = (req, res) => {
    console.log("getOneAchievment() executed");

    const playerId = req.params.playerId;
    const achievmentId = req.params.achievmentId;

    Player.findById(playerId).exec((err, player) => {
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
        } else {
            response.message = player.achievments.id(achievmentId);
        }

        res.status(parseInt(response.status)).json(response.message);

    });
};

//POST /players/:playerId/achievments
const addOneAchievment = (req, res) => {
    console.log("getAllAchievments() executed");

    const playerId = req.params.playerId;
    Player
        .findById(playerId)
        .select(process.env.DB_PLAYER_SUB_ACHIEVMENTS)
        .exec((err, player) => {
            console.log("findById: ", player);
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
                const achievment = {
                    contest: req.body.contest,
                    medal: req.body.medal
                };
                // if (!player.achievments) player.achievments = [];
                // console.log("achievment: ", achievment);
                // console.log("player.achievments: ", player.achievments);

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