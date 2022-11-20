const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('socials')
        .setDescription("All of Meeny's Social Media's (Stuff like Twitter and whatever)"),
    async execute(interaction) {
        var socialsEmbed = new EmbedBuilder()
        .setTitle(`Meeny's Socials`)
        .setDescription("Twitter: https://twitter.com/MeenyDiscord");
        await interaction.reply({ embeds: [socialsEmbed] });
    },
};