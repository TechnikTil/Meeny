const { EmbedBuilder } = require('discord.js');
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

        const answer = Math.floor(Math.random() * 5);

        const eightBallEmbed = new EmbedBuilder()
            .setTitle(`Meeny's 8Ball!`)
            .setDescription(`**${interaction_metadata.user.username}** asked "${question}"\n And the answer is... ${possibleAnswers[answer]}`)
            .setFooter({ text: `Requested by: ${interaction_metadata.user.username}` });

        await interaction_metadata.reply({ embeds: [eightBallEmbed] });

        watcher.command(interaction_metadata, `Question: ${question}, Answer: ${possibleAnswers[answer]}`);
    },
};