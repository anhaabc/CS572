require('dotenv').config();
require("./api/data/db.js");

const express = require('express')
const path = require('path');
const routes = require('./api/routes');
const app = express();

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/api", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", routes)

const server = app.listen(process.env.PORT, () => {
    console.log(process.env.MSG_SERVER_START + server.address().port)
});