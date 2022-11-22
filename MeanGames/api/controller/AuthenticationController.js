const jwt = require("jsonwebtoken")
const utils = require('./utils')
const util = require("util")

const authenticate = (req, res, next) => {
    const response = {
        status: 403,
        message: "no token provided"
    }

    const headerExists = req.headers.authorization;

    const jwtVerifyPromise = util.promisify(jwt.verify, {context: jwt});

    jwtVerifyPromise(token, process.env.JWT_PASS)
        .then(() => next())
        .catch(() => {})
        .finally(() => {});

    if (headerExists) {
        const token = headerExists.split(" ")[1];
        if (jwt.verify(token, process.env.JWT_PASS))
            next();
        else {
            response.message = "Invalid token";
            utils._sendResponse(res, response);
        }
    } else {
        utils._sendResponse(res, response);
    }
}

module.exports = {
    authenticate
};