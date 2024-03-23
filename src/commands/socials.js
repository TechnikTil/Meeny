const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const watcher = require('../backend/watcher.js');

module.exports = {
    data:
    {
        'name': 'socials',
        'type': 1,
        'description': 'All of Meeny\'s Social Media\'s (Stuff like Twitter and whatever)',
        'integration_types': [1],
        'contexts': [1],
    },

    async execute(interaction_metadata) {
        const socialsButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('GitHub (also comes with Source Code)')
                .setStyle(ButtonStyle.Link)
                .setURL('https://github.com/MeenyDiscord')
                .setEmoji('1044414200941903922'),
            new ButtonBuilder()
                .setLabel('Twitter (IM NOT CALLING IT X)')
                .setStyle(ButtonStyle.Link)
                .setURL('https://twitter.com/MeenyDiscord')
                .setEmoji('1044414199603933207'),
        );

        const socialsEmbed = new EmbedBuilder()
            .setTitle(`Meeny's Socials`)
            .setDescription("Click a button below to visit one of them!");

        await interaction_metadata.reply({ embeds: [socialsEmbed], components: [socialsButtons] });

        watcher.command(interaction_metadata);
    },
};

/*  Just incase they add intergration_types to the slashcommandbuilder :)
    data: new SlashCommandBuilder()
        .setName('socials')
        .setDescription("All of Meeny's Social Media's (Stuff like Twitter and whatever)"),
*/