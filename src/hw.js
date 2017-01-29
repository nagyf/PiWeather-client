const winston = require('winston');
const dht22 = require('node-dht-sensor');
const bmp085lib = require('bmp085');
const config = require('../config.json');

const bmp085 = new bmp085lib({
    'mode': 1,
    'address': 0x77,
    'device': '/dev/i2c-1'
});

/**
 * Reads the current humidity and pressure from the hardware and return a promise
 */
function readTemperatureAndPressure() {
    const promise = new Promise((resolve, reject) => {
        bmp085.read(data => {
            resolve({
                temperature: {
                    value: data.temperature,
                    unit: "%"
                },
                pressure: {
                    value: data.pressure,
                    unit: "Psi"
                }
            });
        });
    });

    promise.catch((ex) => {
        winston.error('Error while reading data from the BMP085 sensor', ex);
    });

    return promise;
}

/**
 * Reads the current temperature from the hardware and return a promise
 */
function readTemperatureAndHumidity() {
    const promise = new Promise((resolve, reject) => {
        dht22.read(22, config.sensor.dht22.pin, (err, temperature, humidity) => {
            if(err) {
                winston.error('Error while reading data from the DHT22 sensor', err);
                reject(err);
            } else {
                resolve({
                    humidity: {
                        value: humidity,
                        unit: "%"
                    },
                    temperature: {
                        value: temperature,
                        unit: "°C"
                    }
                });
            }
        });
    });

    promise.catch(ex => {
        winston.error('Error while reading data from the DHT22 sensor', ex);
    });

    return promise;
}

module.exports = {
    readTemperatureAndPressure: readTemperatureAndPressure,
    readTemperatureAndHumidity: readTemperatureAndHumidity
};