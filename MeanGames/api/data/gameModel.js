const mongoose = require('mongoose');

const publisherSchema = mongoose.Schema({
    name: String,
    location: String
});

const gameSchema = mongoose.Schema({
    title: String,
    year: Number,
    rate: Number,
    price: Number,
    minPlayers: Number,
    maxPlayers: Number,
    publisher: [publisherSchema],
    reviews: String,
    minAge: Number,
    designers: String
});

mongoose.model(process.env.DB_PLAYER_MODEL, gameSchema, process.env.DB_PLAYER_COLLECTION);