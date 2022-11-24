const mongoose = require('mongoose')

const achievmentSchema = mongoose.Schema({
    contest: {
        type: String,
        required: true
    },
    medal: {
        type: String,
        required: true
    }
});

const playerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    achievments: {
        type: [achievmentSchema],
        default: []
    }
    
});

mongoose.model(process.env.DB_PLAYER_MODEL, playerSchema, process.env.DB_PLAYER_COLLECTION);