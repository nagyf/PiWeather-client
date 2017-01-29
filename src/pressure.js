const api = require('./api');

const endpointName = 'pressure';

function list() {
    return api.list(endpointName);
}

function create(pressure) {
    return api.create(endpointName, pressure)
}

module.exports = {
    create: create,
    list: list
};