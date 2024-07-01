const { EmbedBuilder } = require('discord.js');
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

        const chanceEmbed = new EmbedBuilder()
            .setTitle(`Chances of...`)
            .setDescription(`The chances of **${chance}** is **${result}%**`)
            .setFooter({ text: `Requested by: ${interaction_metadata.user.username}` });

        await interaction_metadata.reply({ embeds: [chanceEmbed] });

        watcher.command(interaction_metadata, `Chances of: ${chance}, Result: ${result}`);
    },
};