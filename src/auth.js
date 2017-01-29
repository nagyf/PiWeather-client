const request = require('request');
const winston = require('winston');
const config = require('../config.json');
const api = require('./api');

function authenticate() {
    return new Promise(function (resolve, reject) {
        request.post(api.getApiUrl('auth/login'), {
                json: {
                    email: config.server.auth.email,
                    password: config.server.auth.password
                }
            },
            function (err, res, body) {
                if (err) {
                    winston.error(err);
                    reject(err);
                } else {
                    resolve(body);
                }
            }
        );
    });
}

module.exports = {
    authenticate: authenticate
};