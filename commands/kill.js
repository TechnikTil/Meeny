const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription("Who will you kill and how will you do it? (WARNING: MAY REPLY WITH SUGGESTIVE CONTENT!)")
        .addUserOption(option => option.setName('target').setDescription('Who do you want to kill?').setRequired(true)),
    async execute(interaction) {
        var target = interaction.options.getUser('target');
        var deaths = [
        `${target} died.`,
        `${target} doesn't die, the good ending.`,
        `${target} died from a broken heart because <@${interaction.user.id}> rejected them.`,
        `Oh noes! A meteor struck ${target}'s house!`,
        `${target} respawned! Oh but sad news, <@${interaction.user.id}> spawnkilled them.`,
        `Oh man, ${target} took 1 step into Reddit and instantly died.`,
        `${target} died from being too unfunny.`,
        `${target} blew their ears out from listening to Taylor Swift.`,
        `${target} ascended into the sky from listening to Kanye West then died to fall damage.`,
        `OOF. ${target} stepped on a land mine and died.`,
        `${target} got flamed by <@${interaction.user.id}> in a rap battle.`,
        `${target} became Skibidi Toilet and <@${interaction.user.id}> just ate Taco Bell...`,
        `<@${interaction.user.id}> had a baby! But ${target} did NOT want a part of that.`];
        var response = Math.floor(Math.random() * 13);

        const killEmbed = new EmbedBuilder()
            .setTitle(`Meeny's Death Chamber`)
            .setDescription(`${deaths[response]}`)
            .setFooter({ text: `Requested by: ${interaction.user.username}` });
        await interaction.reply({ embeds: [killEmbed] });
        console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}, Target: ${target}, Cause of death: ${deaths[response]}`);
    },
};