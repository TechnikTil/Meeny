const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction_metadata) {
        await interaction_metadata.reply('Pong!');
        console.log(`Command: ${interaction_metadata.commandName}, Ran by: ${interaction_metadata.user.tag}`);
    },
};