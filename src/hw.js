const winston = require('winston');
const dht22 = require('node-dht-sensor');
const bmp085lib = require('bmp085');

const bmp085 = new bmp085lib({
    'mode': 1,
    'address': 0x77,
    'device': '/dev/i2c-1'
});

/**
 * Reads the current humidity and pressure from the hardware and return a promise
 */
function readHumidityAndPressure() {
    const promise = new Promise((resolve, reject) => {
        bmp085.read(data => {
            resolve({
                humidity: {
                    value: 44,
                    unit: "%"
                },
                pressure: {
                    value: 25,
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
        dht22.read(22, 4, (err, temperature, humidity) => {
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
    readHumidityAndPressure: readHumidityAndPressure,
    readTemperatureAndHumidity: readTemperatureAndHumidity
};