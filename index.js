const winston = require('winston');
const auth = require('./src/auth');
const api = require('./src/api');

auth.authenticate().then(
    function (res) {
        winston.info('Success', res);
        api.setToken(res.token);
    },
    function (err) {
        winston.error('Error', err);
    }
);