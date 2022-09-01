const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meter')
    .setDescription("Meeny's Meter you can use to check how gay and stupid you are (there is more but thats up to you)")
    .addStringOption(option => option.setName('meter').setDescription('What Meter do you want?').setRequired(true))
    .addStringOption(option => option.setName('item').setDescription('What Item/Person/Object (you get it) do you want?').setRequired(true)),
  async execute(interaction) {
    const meter = interaction.options.getString('meter');
    const item = interaction.options.getString('item');
    const meterEmbed = new EmbedBuilder()
      .setTitle(`Meeny's ${meter} Meter!`)
      .setDescription(`**${interaction.user.username}** has a ${meter} meter at **${item}** ${Math.floor(Math.random() * 101)}%`)
      .setFooter({ text: `Requested by: ${interaction.user.username}` });
    await interaction.reply({ embeds: [meterEmbed] });
  },
};