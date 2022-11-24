const jwt = require("jsonwebtoken")
const utils = require('./Utilities')
const util = require("util");
const { resolve } = require("path");

const authenticate = (req, res, next) => {
    const response = utils._createDefaultResponse(403, "no token provided");
    const header = req.headers.authorization;

    if (!header || header.split(" ").length !== 2) {
        utils._updateResponse(400, "Bad Request", response);
        utils._sendResponse(res, response);
        return;
    }
    
    const token = header.split(" ")[1];
    const jwtVerifyPromise = util.promisify(jwt.verify, {context: jwt});
    jwtVerifyPromise(token, process.env.JWT_PASS)
        .then(isValid => {
            console.log("verify:", isValid);
            if (isValid) {
                utils._updateResponse(200, "token ok", response);
                resolve();
            } else {
                utils._updateResponse(401, "Unauthorized", response);
                reject();
            }
        })
        .then(() => next())
        .catch(err => utils._handleError(err, response))
}
 
const _verifyToken = (header, response) => {
    return new Promise((resolve, reject) => {
        
        if (header) {
    
        const token = header.split(" ")[1];
            if (jwt.verify(token, process.env.JWT_PASS))
                resolve();
            else {
                utils._updateResponse(498, "Invalid token", response);
                reject();
            }
        } else {
            utils._updateResponse(400, "Bad Request", response);
        }
    })
}

module.exports = {
    authenticate
};