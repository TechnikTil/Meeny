const watcher = require('../utils/watcher.js');

module.exports = {
    data: {
        name: 'flipacoin',
        type: 1,
        description: 'Flipping a coin to get either heads or tails.',
        options: [
            {
                type: 3,
                name: 'reason',
                description: 'What is the reason for doing this?',
                required: true,
            },
        ],
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },

    async execute(interaction_metadata) {
        const reason = interaction_metadata.options.getString('reason');
        const result = (Math.random() < 0.5) ? 'Heads' : 'Tails';

        await interaction_metadata.reply({
            embeds: [
                {
                    title: 'Flip a Coin',
                    description: `Flipped a coin for **${reason}**\nIt landed on... **${result}**`,
                    footer: {
                        text: `Requested by: ${interaction_metadata.user.username}`
                    }
                }
            ]
        });

        watcher.command(interaction_metadata, `Reason: ${reason}, Result: ${result}`);
    },
};