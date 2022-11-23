const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Some information about Meeny BETA (WIP)'),
    async execute(interaction) {
        var infoEmbed = new EmbedBuilder()
            .setTitle(`Information`)
            .setDescription("Click a button below to see some information about Meeny (if there is no button then discord is having a skill issue or im still making this command.");
        await interaction.reply({ embeds: [infoEmbed] });
        console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}`);
    },
};