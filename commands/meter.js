const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meter')
        .setDescription("Meeny's Meter you can use to check how gay and stupid you are (there is more but thats up to you)")
        .addStringOption(option => option.setName('meter').setDescription('What Meter do you want?').setRequired(true))
        .addStringOption(option => option.setName('item').setDescription('What Item/Person/Object (you get it) do you want?').setRequired(true)),
    async execute(interaction) {
        var meter = interaction.options.getString('meter');
        var item = interaction.options.getString('item');
        var result = Math.floor(Math.random() * 101);

        var meterEmbed = new EmbedBuilder()
            .setTitle(`Meeny's ${meter} Meter!`)
            .setDescription(`**${interaction.user.username}** has a **${meter}** meter at **${item}** ${result}%`)
            .setFooter({ text: `Requested by: **${interaction.user.username}**` });
        await interaction.reply({ embeds: [meterEmbed] });
        console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}, Meter: ${meter}, Item: ${item}, Result: ${result}`);
    },
};