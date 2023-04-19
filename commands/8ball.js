const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription("Meeny's 8Ball you can use to either cry or flip your desk when you see the results")
        .addStringOption(option => option.setName('question').setDescription('What do you want to know?').setRequired(true)),
    async execute(interaction) {
        var question = interaction.options.getString('question');
        var possibleAnswers = ['Yes', 'No', 'Maybe', "I don't know", 'Try Asking Again'];
        var answer = Math.floor(Math.random() * 6);

        var eightBallEmbed = new EmbedBuilder()
            .setTitle(`Meeny's 8Ball!`)
            .setDescription(`**${interaction.user.username}** asked "${question}"\n The answer is... ${possibleAnswers[answer]}`)
            .setFooter({ text: `Requested by: ${interaction.user.username}` });
        await interaction.reply({ embeds: [eightBallEmbed] });
        console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}, Question: ${question}, Answer: ${possibleAnswers[answer]}`);
    },
};