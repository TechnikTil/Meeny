const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('achievement')
        .setDescription('Replies with a Minecraft Achievement of choice (Achievement Icon is Randomized)')
        .addStringOption(option => option.setName('achievement').setDescription('What should the name of the achievement be?').setRequired(true)),
    async execute(interaction) {
        var achievement = interaction.options.getString('achievement');
        var link = `https://minecraftskinstealer.com/achievement/${Math.floor(Math.random() * 40)}/Achievement+Get%21/${achievement.replace(/ /g, "+")}`;

        await interaction.reply(link);
        console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}, Name: ${achievement}, Link: ${link}`);
    },
};