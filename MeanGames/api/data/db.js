const mongoose = require('mongoose');

require('./gameModel');
require('./userModel');

mongoose.connect(process.env.DB_URL + process.env.DB_NAME, 
    {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("connected", () => {
    console.log(process.env.MSG_DB_ON_CONNECTED);
});

mongoose.connection.on("disconnected", () => {
    console.log(process.env.MSG_DB_ON_DISCONNECTED);
});

mongoose.connection.on("error", (err) => {
    console.log(process.env.MSG_DB_ON_ERROR, err);
});

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log(process.env.MSG_SIGINT);
        process.exit(0);
    });
});

process.on("SIGTERM", () => {
    mongoose.connection.close(() => {
        console.log(process.env.MSG_SIGTERM);
        process.exit(0);
    });
});

process.on("SIGUSR2", () => {
    mongoose.connection.close(() => {
        console.log(process.env.MSG_SIGUSR2);
        process.kill(process.pid, "SIGUSR2");
    });
});