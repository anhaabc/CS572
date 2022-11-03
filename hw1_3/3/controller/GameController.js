const gameData = require('./../data/games.json')

module.exports.getAllGames = (req, res) => {
    res.json(gameData);
};

module.exports.getOneGame = (req, res) => {
    let id = req.params.id;
    if (0 < id && id <= gameData.length)
        res.status(parseInt(process.env.HTTP_SUCCESS_STATUS)).json(gameData[id - 1]);
    else
        res.status(parseInt(process.env.HTTP_NOT_FOUND_STATUS)).end();
};