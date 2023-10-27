const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription("Show's you the info of this server!"),
    async execute(interaction) {
        // Buttons
        const serverB = new ButtonBuilder()
            .setCustomId('serverB')
            .setLabel('Server Info')
            .setStyle(ButtonStyle.Primary);

        const membersB = new ButtonBuilder()
            .setCustomId('membersB')
            .setLabel('Member Info')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
            .addComponents(serverB, membersB);

        //Embeds
        const infoEmbed = new EmbedBuilder()
            .setTitle(`Server Info`)
            .setDescription('Select a button!')
            .setFooter({ text: `Requested by: ${interaction.user.username}` })

        const serverEmbed = new EmbedBuilder()
            .setTitle(`Server Info`)
            .setDescription('WIP!!!!!')
            .setFooter({ text: `Requested by: ${interaction.user.username}` })

        const membersEmbed = new EmbedBuilder()
            .setTitle(`Server Info`)
            .setDescription('WIP!!!!! 2.0')
            .setFooter({ text: `Requested by: ${interaction.user.username}` })

        const infoReply = await interaction.reply({ embeds: [infoEmbed], components: [row]});

        const collector = i => i.user.id === interaction.user.id;
        try {
            const infoButton = await infoReply.awaitMessageComponent({ filter: collector });
            if (infoButton.customId === 'serverB')
            {
                await infoButton.update({ embeds: [serverEmbed], components: [row] });
                serverB.setDisabled(true);
                membersB.setDisabled(false);
            }
            if (infoButton.customId === 'membersB')
            {
                await infoButton.update({ embeds: [membersEmbed], components: [row] });
                serverB.setDisabled(false);
                membersB.setDisabled(true);
            }
        } catch (error) {
            await interaction.reply({ content: 'There was an error while using this button!', ephemeral: true });
        }

        console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}`);
    },
};