const { EmbedBuilder } = require('discord.js');
const watcher = require('../backend/watcher.js');

module.exports = {
    data:
    {
        'name': 'meter',
        'type': 1,
        'description': 'Meeny\'s Meter you can use to check how gay and stupid you are (there is more but thats up to you)',
        options:
        [
            {
                type: 3,
                name: 'meter',
                description: 'What Meter do you want?',
                required: true,
            },
            {
                type: 3,
                name: 'item',
                description: 'What Item/Person/Object (you get it) do you want?',
                required: true,
            },
        ],
        'integration_types': [0, 1],
        'contexts': [0, 1, 2],
    },

    async execute(interaction_metadata) {
        const meter = interaction_metadata.options.getString('meter');
        const item = interaction_metadata.options.getString('item');
        const result = Math.floor(Math.random() * 101);

        const meterEmbed = new EmbedBuilder()
            .setTitle(`Meeny's ${meter} Meter!`)
            .setDescription(`**${interaction_metadata.user.username}** has a **${meter}** meter at **${item}** ${result}%`)
            .setFooter({ text: `Requested by: ${interaction_metadata.user.username}` });

        await interaction_metadata.reply({ embeds: [meterEmbed] });

        watcher.command(interaction_metadata, `Meter: ${meter}, Item: ${item}, Result: ${result}`);
    },
};

/*  Just incase they add intergration_types to the slashcommandbuilder :)
    data: new SlashCommandBuilder()
        .setName('meter')
        .setDescription("Meeny's Meter you can use to check how gay and stupid you are (there is more but thats up to you)")
        .addStringOption(option => option.setName('meter').setDescription('What Meter do you want?').setRequired(true))
        .addStringOption(option => option.setName('item').setDescription('What Item/Person/Object (you get it) do you want?').setRequired(true)),
*/