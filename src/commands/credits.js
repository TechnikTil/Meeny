const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const watcher = require('../backend/watcher.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('credits')
        .setDescription("All of the people who worked/helped making this bot"),

    async execute(interaction_metadata) {
        const socialsEmbed = new EmbedBuilder()
            .setTitle(`Credits`)
            .setDescription("Owner: CrusherNotDrip\n Co-Owner: NeonFurious\nProfile Picture: jori (Owner of Hyper Metal) + maham (helped with making it a tiny bit better\nCoding help: discord.js (It has a helpful guide! https://discordjs.guide)\nAchievement Command URL: https://minecraftskinstealer.com");

        await interaction_metadata.reply({ embeds: [socialsEmbed] });

        watcher.command(interaction_metadata);
    },
};