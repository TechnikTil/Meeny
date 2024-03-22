const { SlashCommandBuilder } = require('discord.js');
const watcher = require('../backend/watcher.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),

    async execute(interaction_metadata) {
        await interaction_metadata.reply('Pong!');

        watcher.command(interaction_metadata);
    },
};