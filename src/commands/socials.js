const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('socials')
        .setDescription("All of Meeny's Social Media's (Stuff like Twitter and whatever)"),
    async execute(interaction_metadata) {
        const socialsButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('GitHub (also comes with Source Code)')
                .setStyle(ButtonStyle.Link)
                .setURL('https://github.com/MeenyDiscord')
                .setEmoji('1044414200941903922'),
            new ButtonBuilder()
                .setLabel('Twitter')
                .setStyle(ButtonStyle.Link)
                .setURL('https://twitter.com/MeenyDiscord')
                .setEmoji('1044414199603933207'),
        );
        const socialsEmbed = new EmbedBuilder()
            .setTitle(`Meeny's Socials`)
            .setDescription("Click a button below to visit one of them!");
        await interaction_metadata.reply({ embeds: [socialsEmbed], components: [socialsButtons] });
        console.log(`Command: ${interaction_metadata.commandName}, Ran by: ${interaction_metadata.user.tag}`);
    },
};