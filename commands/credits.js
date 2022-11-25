const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('credits')
        .setDescription("All of the people who worked/helped making this bot"),
    async execute(interaction) {
        var socialsEmbed = new EmbedBuilder()
            .setTitle(`Credits`)
            .setDescription("Owner: CrusherNotDrip#0001\n Co-Owner: NeonFurious#5786 (Owner of Roboscrew)\nProfile Picture: jori (Owner of Hyper Metal) + maham (helped with making it a tiny bit better\nCoding help: discord.js (It has a helpful guide! https://discordjs.guide)\nAchievement Command URL: https://minecraftskinstealer.com");
        await interaction.reply({ embeds: [socialsEmbed] });
        console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}`);
    },
};