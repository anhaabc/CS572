require('dotenv').config();
const express = require('express')
const path = require('path');
const routes = require('./routes');
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

const server = app.listen(process.env.PORT, () => {
    console.log("server started on port: " + server.address().port)
});