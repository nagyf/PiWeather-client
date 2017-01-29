const winston = require('winston');
const dht22lib = require('node-dht-sensor');
const bmp085lib = require('bmp085');

const dht22 = {
    initialize: () => {
        return dht22lib.initialize(22, 22);
    },
    read: () => {
        const readout = dht22lib.read();
        const values = {
            temperature: readout.temperature.toFixed(2),
            humidity: readout.humidity.toFixed(2)
        };
        winston.info(`DHT22 temperature: ${values.temperature} °C; DHT22 humidity: ${values.humidity} %`);
        return values;
    }
};

if (!dht22.initialize()) {
    winston.error('Unable to initialize DHT22');
    throw new Error('Unable to initialize DHT22');
}

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
    const result = dht22.read();
    return Promise.resolve({
        humidity: {
            value: result.humidity,
            unit: "%"
        },
        temperature: {
            value: result.temperature,
            unit: "°C"
        }
    });
}

module.exports = {
    readHumidityAndPressure: readHumidityAndPressure,
    readTemperatureAndHumidity: readTemperatureAndHumidity
};