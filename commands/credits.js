const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('credits')
    .setDescription("All of the people who worked/helped making this bot"),
  async execute(interaction) {
    var socialsEmbed = new EmbedBuilder()
      .setTitle(`Credits`)
      .setDescription("Owner: CrusherNotDrip#0001\n Co-Owner: NeonFurious#5786\n Profile Picture: jori + maham");
    await interaction.reply({ embeds: [socialsEmbed] });
  },
};