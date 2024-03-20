const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription("Who will you kill and how will you do it? (WARNING: MAY REPLY WITH SUGGESTIVE CONTENT!)")
        .addUserOption(option => option.setName('target').setDescription('Who do you want to kill?').setRequired(true)),
    async execute(interaction_metadata) {
        const target = interaction_metadata.options.getUser('target');
        const user = `<@${interaction_metadata.user.id}>`;
        const deaths = [
        `${target} died.`,
        `${target} doesn't die, the good ending.`,
        `${target} died from a broken heart because ${user} rejected them.`,
        `Oh noes! A meteor struck ${target}'s house!`,
        `${target} respawned! Oh but sad news, ${user} spawnkilled them.`,
        `Oh man, ${target} took 1 step into Reddit and instantly died.`,
        `${target} died from being too unfunny.`,
        `${target} blew their ears out from listening to Taylor Swift.`,
        `${target} ascended into the sky from listening to Kanye West then died to fall damage.`,
        `OOF. ${target} stepped on a land mine and died.`,
        `${target} got flamed by ${user} in a rap battle.`,
        `${target} became Skibidi Toilet and ${user} just ate Taco Bell...`,
        `${user} had a baby! But ${target} did NOT want a part of that.`];
        const response = Math.floor(Math.random() * 13);

        const killEmbed = new EmbedBuilder()
            .setTitle(`Meeny's Death Chamber`)
            .setDescription(`${deaths[response]}`)
            .setFooter({ text: `Requested by: ${interaction_metadata.user.username}` });
        await interaction_metadata.reply({ embeds: [killEmbed] });
        console.log(`Command: ${interaction_metadata.commandName}, Ran by: ${interaction_metadata.user.tag}, Target: ${target}, Cause of death: ${deaths[response]}`);
    },
};