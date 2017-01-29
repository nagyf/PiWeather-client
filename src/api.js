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

module.exports = {
    setToken: setToken,
    getToken: getToken,
    getApiUrl: getApiUrl
};