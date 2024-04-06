const { EmbedBuilder } = require('discord.js');
const watcher = require('../backend/watcher.js');

module.exports = {
    data:
    {
        'name': 'credits',
        'type': 1,
        'description': 'All of the people who worked/helped making this bot',
        'integration_types': [1],
        'contexts': [1],
    },

    async execute(interaction_metadata) {
        const socialsEmbed = new EmbedBuilder()
            .setTitle(`Credits`)
            .setDescription("Owner: CrusherNotDrip\n Co-Owner: NeonFurious\nServer: TechnikTil\nProfile Picture: jori (Owner of Hyper Metal) + maham (helped with making it a tiny bit better\nCoding Help: discord.js (It has a beginner guide if you never coded a discord.js bot before! https://discordjs.guide)\nAchievement Command URL: https://minecraftskinstealer.com");

        await interaction_metadata.reply({ embeds: [socialsEmbed] });

        watcher.command(interaction_metadata);
    },
};

/*  Just incase they add intergration_types to the slashcommandbuilder :)
    data: new SlashCommandBuilder()
        .setName('credits')
        .setDescription("All of the people who worked/helped making this bot"),
*/