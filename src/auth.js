const request = require('request');
const winston = require('winston');
const config = require('../config.json');
const api = require('./api');

/**
 * Authenticates with the API
 * @returns {Promise} a promise object
 */
function authenticate() {
    return new Promise(function (resolve, reject) {
        request.post(api.getApiUrl('auth/login'), {
                json: {
                    email: config.server.auth.email,
                    password: config.server.auth.password
                }
            },
            api.handleApiResponse.bind(null, resolve, reject)
        );
    });
}

function renew() {
    return new Promise(function (resolve, reject) {
        request.post(api.getApiUrl('token/renew'), {},
            api.handleApiResponse.bind(null, resolve, reject)
        );
    });
}

module.exports = {
    authenticate: authenticate,
    renew: renew
};