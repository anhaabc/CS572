require('dotenv').config();
require('./api/data/db');

const path = require('path')
const express = require('express');
const app = express();
const routes = require('./api/routes')

app.use("/", (req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/api", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api", routes);

const server = app.listen(process.env.PORT, () => {
    console.log(`${process.env.MSG_SERVER_START} : ${server.address().port}`);
});