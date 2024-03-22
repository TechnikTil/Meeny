const { SlashCommandBuilder } = require('discord.js');
const watcher = require('../backend/watcher.js');
const date = new Date(); //lmao

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Say a message as Meeny BETA')
        .addStringOption(option => option.setName('message').setDescription('What do you want to say as Meeny BETA?').setRequired(true)),

    async execute(interaction_metadata) {
        const message = interaction_metadata.options.getString('message');
        await interaction_metadata.reply({ content: 'Sent Message!', ephemeral: true });
        await interaction_metadata.channel.send({ content: message });
        //Your not safe if you type something as Meeny BETA... I will already know... if your on the watchlist
        watcher.command(interaction_metadata, `Message: ${message}, Date: ${date.toLocaleString('en-US', { timeZone: 'America/Toronto', dateStyle: 'short', timeStyle: 'short' })}`);
    },
};