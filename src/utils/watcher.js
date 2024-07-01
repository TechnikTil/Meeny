function command(interaction, extraText) {
    if (!process.env['watchList'].includes(interaction.user.id))
        return;

    if (extraText != null)
        return console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}, ` + extraText + ' - ' + getCmdFile());
    else
        return console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag} - ` + getCmdFile());
}

// Modified Version of https://www.npmjs.com/package/get-caller-file
function getCmdFile() {
    var path = require("path");
    var pathName = '';

    var oldPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) { return stack; };
    var stack = new Error().stack;
    Error.prepareStackTrace = oldPrepareStackTrace;

    if (stack !== null && typeof stack === 'object') {
        pathName = stack[2] ? stack[2].getFileName() : undefined;
    }

    return path.basename(pathName);
};

module.exports = { command, getCmdFile }