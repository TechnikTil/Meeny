const { EmbedBuilder } = require('discord.js');
const watcher = require('../utils/watcher.js');

module.exports = {
    data: {
        name: 'credits',
        type: 1,
        description: 'All of the people who worked/helped making this bot',
        integration_types: [1],
        contexts: [1],
    },

    async execute(interaction_metadata) {
        await interaction_metadata.reply({
            embeds: [
                {
                    title: 'Credits',
                    description: 'Owner: CrusherNotDrip (Lead Programmer)\nServer Runner: TechnikTil\nProfile Picture: jori (Made the base pfp) + maham (Polished it a bit)\nMade with: discord.js'
                }
            ]
        });

        watcher.command(interaction_metadata);
    },
};