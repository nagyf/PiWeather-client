const api = require('./api');

const endpointName = 'humidity';

function list() {
    return api.list(endpointName);
}

function create(humidity) {
    return api.create(endpointName, humidity);
}

module.exports = {
    create: create,
    list: list
};