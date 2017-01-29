const winston = require('winston');
const auth = require('./src/auth');
const api = require('./src/api');
const humidity = require('./src/humidity');
const pressure = require('./src/pressure');
const temperature = require('./src/temperature');

auth.authenticate().then(
    function (res) {
        winston.info('Success', res);
        api.setToken(res.token);

        humidity.list().then(res => {
            winston.info(res);
        });

        pressure.list().then(res => {
            winston.info(res);
        });

        temperature.list().then(res => {
            winston.info(res);
        });
    },
    function (err) {
        winston.error('Error', err);
    }
);