const { SlashCommandBuilder } = require('discord.js');
const date = new Date(); //lmao

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Say a message as Meeny BETA')
        .addStringOption(option => option.setName('message').setDescription('What do you want to say as Meeny BETA?').setRequired(true)),
    async execute(interaction) {
        var message = interaction.options.getString('message');
        await interaction.reply({ content: 'Sent Message!', ephemeral: true });
        await interaction.channel.send(message);
        //Your not safe if you type something as Meeny BETA... I will already know
        //https://bobbyhadz.com/blog/javascript-convert-local-time-to-est#:~:text=in%20different%20ways.-,index.js,-const%20date%20%3D
        console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}, Message: ${message}, Time: ${date.toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'full' })}`);
    },
};