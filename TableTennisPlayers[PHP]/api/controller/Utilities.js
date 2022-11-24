const _debugLog = (message) => {
    if (JSON.parse(process.env.DEBUG_FLAG))
        console.log(message);
}

const _sendResponse = (res, response) => {
    res.status(parseInt(response.status)).json(response.message);
}

const _handleError = (err, response) => {
    _debugLog(err);
    response.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    response.message = err;
}

const _createDefaultResponse = (status, message) => {
    return {
        status: status,
        message: message
    }
}

const _updateResponse = (status, message, response) => {
    if (status) response.status = status;
    if (message) response.message = message;
}

const _checkPlayerAndUpdateResponse = (player, message, response) => {
    if(!player) {
        _updateResponse(process.env.HTTP_STATUS_NOT_FOUND ,{"message" : process.env.MSG_PLAYER_NOT_FOUND}, response);
    } else {
        _updateResponse(process.env.HTTP_STATUS_OK, message, response);
    }
}

module.exports = {
    _debugLog,
    _sendResponse,
    _handleError,
    _createDefaultResponse,
    _updateResponse,
    _checkPlayerAndUpdateResponse
}