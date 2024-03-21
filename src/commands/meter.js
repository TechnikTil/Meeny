const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meter')
        .setDescription("Meeny's Meter you can use to check how gay and stupid you are (there is more but thats up to you)")
        .addStringOption(option => option.setName('meter').setDescription('What Meter do you want?').setRequired(true))
        .addStringOption(option => option.setName('item').setDescription('What Item/Person/Object (you get it) do you want?').setRequired(true)),
    async execute(interaction_metadata) {
        const meter = interaction_metadata.options.getString('meter');
        const item = interaction_metadata.options.getString('item');
        const result = Math.floor(Math.random() * 101);

        const meterEmbed = new EmbedBuilder()
            .setTitle(`Meeny's ${meter} Meter!`)
            .setDescription(`**${interaction_metadata.user.username}** has a **${meter}** meter at **${item}** ${result}%`)
            .setFooter({ text: `Requested by: ${interaction_metadata.user.username}` });
        await interaction_metadata.reply({ embeds: [meterEmbed] });
        //console.log(`Command: ${interaction_metadata.commandName}, Ran by: ${interaction_metadata.user.tag}, Meter: ${meter}, Item: ${item}, Result: ${result}`);
    },
};