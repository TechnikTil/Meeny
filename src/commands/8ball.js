const watcher = require('../utils/watcher.js');

module.exports = {
    data: {
        name: '8ball',
        type: 1,
        description: 'Meeny\'s 8Ball you can use to either cry or flip your desk when you see the results',
        options: [
            {
                type: 3,
                name: 'question',
                description: 'What do you want to know?',
                required: true,
            },
        ],
        integration_types: [0, 1],
        contexts: [0, 1, 2],
    },

    async execute(interaction_metadata) {
        const question = interaction_metadata.options.getString('question');

        const possibleAnswers = [
            'Yes',
            'No',
            'Maybe',
            'I don\'t know',
            'Try Asking Again'
        ];

        const answer = Math.floor(Math.random() * possibleAnswers.length);

        await interaction_metadata.reply({
            embeds: [
                {
                    title: 'Meeny\'s 8Ball!',
                    description: `**${interaction_metadata.user.username}** asked "${question}"\n And the answer is... ${possibleAnswers[answer]}`,
                    footer: {
                        text: `Requested by: ${interaction_metadata.user.username}`
                    }
                }
            ]
        });

        watcher.command(interaction_metadata, `Question: ${question}, Answer: ${possibleAnswers[answer]}`);
    },
};