const dbConnection= require("../data/dbconnection.js");
const ObjectId = require("mongodb").ObjectId;

module.exports.getAllGames = (req, res) => {
    const db = dbConnection.get();
    const gamesCollection= db.collection("games");
    let count = 7;
    if (req.query && req.query.count) {
        count = Math.min(parseInt(req.query.count, 10), count);
    }
    gamesCollection.find().limit(count).toArray(function(err, games) {
        console.log("Found games", games);
        res.status(parseInt(process.env.HTTP_OK_STATUS)).json(games);
    });
};

module.exports.getOneGame = (req, res) => {
    const db = dbConnection.get();
    const gamesCollection = db.collection("games");
    const gameId = req.params.gameId;
    console.log("gameId", gameId);
    console.log("ObjectId", ObjectId(parseInt(gameId)));
    gamesCollection.findOne({_id : ObjectId(parseInt(gameId))}, function(err, game) {
        if (err) {
            console.log("err", err);
            return;
        }
        console.log("Found game", game);
        res.status(parseInt(process.env.HTTP_OK_STATUS)).json(game);
    });
};

module.exports.addOne = function(req, res) {
    if (req.body && req.body.title && req.body.price && req.body.minPlayers && req.body.minAge) {
        let newGame= {};
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        newGame.minPlayers = parseInt(req.body.minPlayers);
        newGame.minAge = parseInt(req.body.minAge);
        
        const db = dbConnection.get();
        const gamesCollection = db.collection("games");
        gamesCollection.insertOne(newGame, function(err, response) {
            if (err) {
                res.status(parseInt(process.env.HTTP_ERROR_STATUS)).json({error: err});
            } else {
                console.log(response);
                res.status(parseInt(process.env.HTTP_SUCCESS_STATUS)).json(response);
            }
        });

    }

    res.status(parseInt(process.env.HTTP_ERROR_STATUS)).json({"error": "Required field is empty."});

};


module.exports.deleteOne = function(req, res) {
    if (req.body && req.body.title && req.body.price && req.body.minPlayers && req.body.minAge) {
        let newGame= {};
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        newGame.minPlayers = parseInt(req.body.minPlayers);
        newGame.minAge = parseInt(req.body.minAge);
        
        const db = dbConnection.get();
        const gamesCollection = db.collection("games");
        gamesCollection.insertOne(newGame, function(err, response) {
            if (err) {
                res.status(parseInt(process.env.HTTP_ERROR_STATUS)).json({error: err});
            } else {
                console.log(response);
                res.status(parseInt(process.env.HTTP_SUCCESS_STATUS)).json(response);
            }
        });

    }

    res.status(parseInt(process.env.HTTP_ERROR_STATUS)).json({"error": "Required field is empty."});

};