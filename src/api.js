const winston = require('winston');
const request = require('request');
const config = require('../config.json');

let token = null;

/**
 * Constructs the API URL.
 * @param endpoint the required endpoint
 * @returns {string} returns the constructed URL
 */
function getApiUrl(endpoint) {
    return config.server.protocol + '://' + config.server.ip + ":" + config.server.port + config.server.apiUrl + '/' + endpoint;
}

/**
 * Sets the token to use with requests used with api endpoints
 * @param newToken JWT token to use
 */
function setToken(newToken) {
    token = newToken;
}

/**
 * Return the JWT token to use
 * @returns {*}
 */
function getToken() {
    return token;
}

function handleApiResponse(resolve, reject, err, res, body) {
    if(err || res.statusCode === 401) {
        winston.error(err, body);
        reject(err);
    } else {
        winston.debug(res);
        resolve(body);
    }
}

function createAuthHeaders() {
    return {
        'Authorization': 'JWT ' + token
    };
}

function list(endpoint) {
    return new Promise(function (resolve, reject) {
        request.get({
                url: getApiUrl(endpoint),
                headers: createAuthHeaders()
            },
            handleApiResponse.bind(null, resolve, reject)
        );
    });
}

function create(endpoint, data) {
    return new Promise(function (resolve, reject) {
        request.post({
                url: getApiUrl(endpoint),
                headers: createAuthHeaders()
            }, {
                json: data
            },
            handleApiResponse.bind(null, resolve, reject)
        );
    });
}

module.exports = {
    setToken: setToken,
    getToken: getToken,
    getApiUrl: getApiUrl,
    handleApiResponse: handleApiResponse,
    create: create,
    list: list
};