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

/**
 * Generic HTTP response handler
 * @param resolve the promise resolve function
 * @param reject the promise reject function
 * @param err the error object
 * @param res the response object
 * @param body the body of the response
 */
function handleApiResponse(resolve, reject, err, res, body) {
    if (err || res.statusCode !== 200) {
        winston.error(err, body);
        reject(err);
    } else {
        winston.debug(res);
        resolve(body);
    }
}

function handleException(ex) {
    winston.error(ex);
}

/**
 * Creates an object that contains the HTTP Authorization headers with the JWT token in it
 * @returns {{Authorization: string}}
 */
function createAuthHeaders() {
    return {
        'Authorization': 'JWT ' + token
    };
}

/**
 * Generic function that can call any endpoint with a simple GET request.
 * @param endpoint the endpoint name
 * @returns {Promise} a promise object
 */
function list(endpoint) {
    const promise = new Promise(function (resolve, reject) {
        request.get({
                url: getApiUrl(endpoint),
                headers: createAuthHeaders()
            },
            function (err, res, body) {
                handleApiResponse(resolve, reject, err, res, body);
            }
        );
    });

    promise.catch(handleException);

    return promise;
}

/**
 * Generic function that can call any endpoint with a simple POST request.
 * @param endpoint the endpoint name
 * @param data the object to send as POST data
 * @returns {Promise} a promise object
 */
function create(endpoint, data) {
    const promise = new Promise(function (resolve, reject) {
        request.post(getApiUrl(endpoint), {
                headers: createAuthHeaders(),
                json: data
            },
            function (err, res, body) {
                handleApiResponse(resolve, reject, err, res, body);
            }
        );
    });

    promise.catch(handleException);

    return promise;
}

module.exports = {
    setToken: setToken,
    getToken: getToken,
    getApiUrl: getApiUrl,
    handleApiResponse: handleApiResponse,
    create: create,
    list: list
};