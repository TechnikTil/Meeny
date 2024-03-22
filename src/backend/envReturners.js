// I don't even know what im doing
const id = process.env['botIDBETA'];
const token = process.env['tokenBETA'];

function getID() {
    return id;
}

function getToken() {
    return token;
}

module.exports = { getID, getToken }