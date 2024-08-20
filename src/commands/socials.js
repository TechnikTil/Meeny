const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const watcher = require('../utils/watcher.js');

module.exports = {
    data: {
        name: 'socials',
        type: 1,
        description: 'All of Meeny\'s Social Media\'s (Stuff like Twitter and whatever)',
        integration_types: [1],
        contexts: [1],
    },

    async execute(interaction_metadata) {
        await interaction_metadata.reply({
            embeds: [
                {
                    title: 'Meeny\'s Socials',
                    description: 'Click a button below to visit any one of meeny\'s socials.'
                }
            ],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            label: 'GitHub (Source Code)',
                            style: 5,
                            url: 'https://github.com/MeenyDiscord/Meeny/tree/Meeny-BETA',
                            emoji: {
                                name: 'twitter',
                                id: '1256759276450349251'
                            }
                        },
                        {
                            type: 2,
                            label: 'Twitter (also known as X)',
                            style: 5,
                            url: 'https://twitter.com/MeenyDiscord',
                            emoji: {
                                name: 'twitter',
                                id: '1256759279294222437'
                            }
                        }
                    ]
                }
            ]
        });

        watcher.command(interaction_metadata);
    },
};