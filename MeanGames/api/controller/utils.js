const _debugLog = (message) => {
    if (JSON.parse(process.env.DEBUG_FLAG.toLowerCase()))
    console.log(message);
}

const _updateResponse = (response, status, message) => {
    response.status = status;
    response.message = message;
}

const _handleError = (err, response) => {
    _debugLog("err" + err);
    response = _updateResponse(response, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, err);
}

const _sendResponse = (res, response) => {
    _debugLog("response");
    _debugLog(response);
    res.status(parseInt(response.status)).json(response.message);
}

module.exports = {
    _debugLog,
    _updateResponse,
    _handleError,
    _sendResponse
}