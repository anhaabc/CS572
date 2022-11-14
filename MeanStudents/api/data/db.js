const mongoose = require('mongoose')

require('./studentModel')

mongoose.connect("mongodb://127.0.0.1:27017/meanStudents", {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("connected", () => {
    console.log("db connected");
})