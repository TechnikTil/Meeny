const watcher = require('../backend/watcher.js');

module.exports = {
    data:
    {
        'name': 'ping',
        'type': 1,
        'description': 'Replies with Pong!',
        'integration_types': [0, 1],
        'contexts': [0, 1, 2],
    },

    async execute(interaction_metadata) {
        await interaction_metadata.reply('Pong!');

        watcher.command(interaction_metadata);
    },
};

/*  Just incase they add intergration_types to the slashcommandbuilder :)
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
*/