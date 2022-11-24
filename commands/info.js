const { Client, GatewayIntentBits, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Some information about Meeny BETA (WIP)'),
    async execute(interaction) {
        const infoButtons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('uptime')
                .setLabel('Uptime')
                .setStyle(ButtonStyle.Primary),
        );

        const backButton = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('back')
                .setLabel('Back')
                .setStyle(ButtonStyle.Primary),
        );

        var infoEmbed = new EmbedBuilder()
            .setTitle(`Information`)
            .setDescription("Click a button below to see some information about Meeny (if there is no button then discord is having a skill issue or im still making this command.");
        await interaction.reply({ embeds: [infoEmbed], components: [infoButtons] });
        console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}`);

        //const index = require('./index');
        const filter = i => i.customId === 'uptime';

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        
        collector.once('collect', async i => {
            if (i.customId === 'uptime') {
                await i.deferUpdate();
                await i.editReply({ components: [backButton] });
                await infoEmbed.setDescription(`Meeny's Current Uptime is: **${uptime()} (STILL A WIP)**`);
                await interaction.editReply({ embeds: [infoEmbed] })
            }
        });
    },
};

//https://maah.gitbooks.io/discord-bots/content/examples/ping-and-uptime.html#:~:text=%3B%0A%20%20%20%20%7D%0A%0A%0A%20%20%20%20case%20%27-,uptime,-%27%3A%20%7B%0A%20%20%20%20%20%20//%20client
function uptime()
{
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    let botUptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    return botUptime;
}