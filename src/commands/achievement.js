const watcher = require('../utils/watcher.js');

module.exports = {
    data: {
        'name': 'achievement',
        'type': 1,
        'description': 'Replies with a Minecraft Achievement of choice (Achievement Icon is Randomized)',
        options:
        [
            {
                type: 3,
                name: 'achievement',
                description: 'What should the name of the achievement be?',
                required: true,
            },
        ],
        'integration_types': [0, 1],
        'contexts': [0, 1, 2],
    },

    async execute(interaction_metadata) {
        const achievement = interaction_metadata.options.getString('achievement');
        const link = `https://minecraftskinstealer.com/achievement/${Math.floor(Math.random() * 40)}/Achievement+Get%21/${achievement.replace(/ /g, "+")}`;

        await interaction_metadata.reply(link);

        watcher.command(interaction_metadata, `Name: ${achievement}, Link: ${link}`);
    },
};

/*  Just incase they add intergration_types to the slashcommandbuilder :)
    data: new SlashCommandBuilder()
        .setName('achievement')
        .setDescription('Replies with a Minecraft Achievement of choice (Achievement Icon is Randomized)')
        .addStringOption(option => option.setName('achievement').setDescription('What should the name of the achievement be?').setRequired(true)),
*/