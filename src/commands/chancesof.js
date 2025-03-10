const watcher = require('../utils/watcher.js');

module.exports = {
    data: {
        name: 'chancesof',
        type: 1,
        description: 'Chances of you using this command: 50%',
        options: [
            {
                type: 3,
                name: 'chance',
                description: 'What do you want to test your luck on?',
                required: true,
            },
        ],
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },

    async execute(interaction_metadata) {
        const chance = interaction_metadata.options.getString('chance');
        const result = Math.floor(Math.random() * 101);

        await interaction_metadata.reply({
            embeds: [
                {
                    title: 'Chances of...',
                    description: `The chances of **${chance}** is **${result}%**`,
                    footer: {
                        text: `Requested by: ${interaction_metadata.user.username}`
                    }
                }
            ]
        });

        watcher.command(interaction_metadata, `Chances of: ${chance}, Result: ${result}`);
    },
};