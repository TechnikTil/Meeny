const { SlashCommandBuilder } = require('discord.js');
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
        //Your not safe if you type something as Meeny BETA... I will already know
        //https://bobbyhadz.com/blog/javascript-convert-local-time-to-est#:~:text=in%20different%20ways.-,index.js,-const%20date%20%3D
        console.log(`Command: ${interaction_metadata.commandName}, Ran by: ${interaction_metadata.user.tag}, Message: ${message}, Time: ${date.toLocaleString('en-US', { timeZone: 'America/Toronto', dateStyle: 'full', timeStyle: 'full' })}`); //11 seconds behind but idc
    },
};