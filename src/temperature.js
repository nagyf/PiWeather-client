const api = require('./api');

const endpointName = 'temperature';

function list() {
    return api.list(endpointName);
}

function create(temperature) {
    return api.create(endpointName, temperature)
}

module.exports = {
    create: create,
    list: list
};