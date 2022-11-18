const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model(process.env.DB_USER_MODEL);
const {_debugLog, _handleError, _sendResponse, _updateResponse} = require('./utils')

const _buildNewUserObject = (req) => {

}

const register = (req, res) => {

    const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(parseInt(process.env.NUMBER_OF_ROUNDS)));



    const newUser = {
        name: req.body.name,
        username: req.body.username,
        password: passwordHash
    };
    const response = {};

    User.create(newUser)
        .then(user => _checkUser(process.env.HTTP_STATUS_CREATED, user, response))
        .catch(err => _handleError(err, response))
        .finally(_sendResponse(res, response));
};

const login = (req, res) => {

    const name = req.body.name;
    const password = req.body.password;
    const response = {};

    User.findOne({username: req.body.username})
        .then(user => _checkUserExist(user, response, process.env.HTTP_STATUS_OK))
        .then(user => _checkPasswordMatch())
        .then(user => _signToken())
        .catch(err => _handleError(err, response))
        .finally(() => _sendResponse(res, response));
        

};

const getAllUsers = (req, res) => {
    const response = {}
    User.find()
        .then(users => _isUserEmpty(users, response))
        .catch(err => _handleError(err, response))
        .finally(() => _sendResponse(res, response));
}

/////////////
/// Internal

const _checkPasswordMatch = (response) => {
    bcrypt.compare(password, user.password)
        .then(match => {
            if (match) {
                _updateResponse(response, process.env.HTTP_STATUS_OK, process.env.MSG_USER_OR_PASS_WRONG)
            } else {
                _updateResponse(response, process.env.HTTP_STATUS_NOT_FOUND, process.env.MSG_USER_OR_PASS_WRONG)

            }
        })
}

const _isUserEmpty = (users, response) => {
    return new Promise((resolve, reject) => {
        if (!users) {
            _updateResponse(response, process.env.HTTP_STATUS_NOT_FOUND, process.env.MSG_USER_NOT_FOUND)
            reject();
        } else {
            _updateResponse(response, process.env.HTTP_STATUS_OK, users)
            resolve();
        }
    })
}

const _checkUserExist = (user , response, statusOk) => {
    return new Promise((resolve, reject) => {
        if (!user) {
            _updateResponse(response, process.env.HTTP_STATUS_NOT_FOUND, process.env.MSG_USER_OR_PASS_WRONG)
            reject();
        } else {
            _updateResponse(response, statusOk, user)
            resolve();
        }
    });
}

module.exports = {
    register,
    login,
    getAllUsers
};
