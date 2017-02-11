const winston = require('winston');
const moment = require('moment');
const config = require('./config.json');
const auth = require('./src/auth');
const api = require('./src/api');
const humidity = require('./src/humidity');
const pressure = require('./src/pressure');
const temperature = require('./src/temperature');
const hw = require('./src/hw');

/**
 * Reads the data from the hardware and sends it to the API
 */
function readDataAndSend() {
    hw.readTemperatureAndPressure().then(res => {
        winston.info(res);

        pressure.create(res.pressure).then(() => {
            winston.info('Pressure data saved');
        });
    });

    hw.readTemperatureAndHumidity().then(res => {
        winston.info(res);
        temperature.create(res.temperature).then(() => {
            winston.info('Temperature data saved');
        });
        humidity.create(res.humidity).then(() => {
            winston.info('Humidity data saved');
        });
    });
}

function setupRenewal(expiration) {
    const exp = moment.unix(expiration);
    const renewalTime = exp.subtract(10, 'minutes');
    const ms = renewalTime.valueOf() - moment().valueOf();

    setTimeout(function () {
        auth.renew().then(function (res) {
            api.setToken(res.token);
            setupRenewal(res.expiration);
        });
    }, ms);
}

auth.authenticate().then(
    function (res) {
        // Set the api token
        api.setToken(res.token);
        setupRenewal(res.expiration);

        // Start the app
        setInterval(readDataAndSend, config.app.interval);
    },
    function (err) {
        winston.error('Error', err);
    }
);