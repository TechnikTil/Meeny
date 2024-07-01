// I don't even know what im doing
function getID() {
    return process.env['botIDBETA'];;
}

function getToken() {
    return process.env['tokenBETA'];;
}

module.exports = { getID, getToken }