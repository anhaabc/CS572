const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("connected", () => {
    console.log(process.env.MSG_MONGOOSE_ON_CONNECTED);
})

mongoose.connection.on("disconnected", () => {
    console.log(process.env.MSG_MONGOOSE_ON_DISCONNECTED);
})

mongoose.connection.on("error", (err) => {
    console.log(process.env.MSG_MONGOOSE_ON_ERROR, err);
})