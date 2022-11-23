const _debugLog = (message) => {
    if (JSON.parse(process.env.DEBUG_FLAG))
        console.log(message);
}

const _sendResponse = (res, response) => {
    res.status(parseInt(response.status)).json(response.message);
}

const _handleError = (err, response) => {
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

module.exports = {
    _debugLog,
    _sendResponse,
    _handleError,
    _createDefaultResponse,
    _updateResponse
}