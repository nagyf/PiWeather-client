/**
 * Reads the current humidity and pressure from the hardware and return a promise
 */
function readHumidityAndPressure() {
    return Promise.resolve({
        humidity: {
            value: 44,
            unit: "%"
        },
        pressure: {
            value: 34,
            unit: "Psi"
        }
    });
}

/**
 * Reads the current temperature from the hardware and return a promise
 */
function readTemperatureAndHumidity() {
    return Promise.resolve({
        humidity: {
            value: 44,
            unit: "%"
        },
        temperature: {
            value: 25,
            unit: "°C"
        }
    });
}

module.exports = {
    readHumidityAndPressure: readHumidityAndPressure,
    readTemperatureAndHumidity: readTemperatureAndHumidity
};