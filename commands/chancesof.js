const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chancesof')
        .setDescription("Chances of you using this command: 50%")
        .addStringOption(option => option.setName('chance').setDescription('What do you want to test your luck on?').setRequired(true)),
    async execute(interaction) {
        var chance = interaction.options.getString('chance');
        var meterEmbed = new EmbedBuilder()
        .setTitle(`Chances of...`)
        .setDescription(`The chances of **${interaction.user.username} ${chance}** is ${Math.floor(Math.random() * 101)}%`)
        .setFooter({ text: `Requested by: ${interaction.user.username}` });
        await interaction.reply({ embeds: [meterEmbed] });
    },
};