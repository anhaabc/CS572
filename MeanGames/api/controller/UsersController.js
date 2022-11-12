const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model(process.env.DB_USER_MODEL);

const register = (req, res) => {

    const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(parseInt(process.env.NUMBER_OF_ROUNDS)));

    const newUser = {
        name: req.body.name,
        username: req.body.username,
        password: passwordHash
    };

    User.create(newUser, (err, user) => {
        const response = {
            status: process.env.HTTP_STATUS_CREATED,
            message: user
        };
        if (err) {
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            response.message = err;
        } else if (!user) {
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = {message: process.env.MSG_USER_NOT_FOUND};
        }
        res.status(parseInt(response.status)).json(response.message);
    });
};

const login = (req, res) => {
    console.log("login called");

    const username = req.body.username;
    const password = req.body.password;

    console.log(req.body);
    User.findOne({username: username}).exec((err, user) => {
        const response = {
            status: process.env.HTTP_STATUS_OK,
            message: []
        };
        if (err) {
            console.log("Error finding user", username);
            response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
            response.message = err;
        } else if (!user) {
            response.status = process.env.HTTP_STATUS_NOT_FOUND;
            response.message = {message: process.env.MSG_USER_OR_PASS_WRONG};
        } else {
            // console.log(user);
            console.log("ok");
            if (bcrypt.compareSync(password, user.password)) {
                console.log("login");
            } else {
                console.log("password not match");
                response.status = process.env.HTTP_STATUS_NOT_FOUND;
                response.message = {message: process.env.MSG_USER_OR_PASS_WRONG};
            }
        }

        res.status(parseInt(response.status)).json(response.message);
    });
};

module.exports = {
    register,
    login
};
