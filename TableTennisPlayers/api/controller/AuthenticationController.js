const jwt = require("jsonwebtoken")
const utils = require('./Utilities')
const util = require("util");

const authenticate = (req, res, next) => {
    const response = utils._createDefaultResponse(process.env.HTTP_STATUS_FORBIDDEN, process.env.MSG_NO_TOKEN);
    const header = req.headers.authorization;

    if (!header || header.split(" ").length !== 2) {
        utils._updateResponse(process.env.HTTP_STATUS_BAD_REQUEST, process.env.MSG_BAD_REQUEST, response);
        utils._sendResponse(res, response);
        return;
    }
    
    const token = header.split(" ")[1];
    const jwtVerifyPromise = util.promisify(jwt.verify, {context: jwt});
    jwtVerifyPromise(token, process.env.JWT_PASS)
        .then(isValid => {
            if (isValid) {
                utils._updateResponse(process.env.HTTP_STATUS_OK, process.env.MSG_TOKEN_OK, response);
                next();
            } else {
                utils._updateResponse(process.env.HTTP_STATUS_UNAUTHORIZED, process.env.MSG_UNAUTHORIZED, response);
            }
        })
        .catch(err => utils._handleError(err, response))
}

module.exports = {
    authenticate
};