const watcher = require('../utils/watcher.js');

module.exports = {
    data: {
        name: 'ping',
        type: 1,
        description: 'Replies with Pong!',
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },

    async execute(interaction_metadata) {
        await interaction_metadata.reply('Pong!');

        watcher.command(interaction_metadata);
    },
};