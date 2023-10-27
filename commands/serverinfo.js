const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription("Show's you the info of this server!"),
    async execute(interaction) {
        // Info Menu
		const infoSelect = new StringSelectMenuBuilder()
			.setCustomId('infoSelect')
			.setPlaceholder('Click Me!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Server Info')
					.setDescription('Information about this server.')
					.setValue('serverI'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Members Info')
					.setDescription('Member information about this server.')
					.setValue('membersI'),
            );

        const row = new ActionRowBuilder()
            .addComponents(infoSelect);

        //Embeds
        const infoEmbed = new EmbedBuilder()
            .setTitle(`Server Info`)
            .setDescription('Select a option!')
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

        const collector = await infoReply.createMessageComponentCollector({ componentType: ComponentType.StringSelect });

        collector.on('collect', async i => {
            if(i.customId === "infoSelect")
            {
                const value = i.values[0];
                if (value === "serverI")
                {
                    await i.update({ embeds: [serverEmbed], components: [row] });
                    console.log(`${interaction.user.username} Picked Server Info! - serverinfo.js`)
                }
                if (value === "membersI")
                {
                    await i.update({ embeds: [membersEmbed], components: [row] });
                    console.log(`${interaction.user.username} Picked Members Info! - serverinfo.js`)
                }
            }
        });

        console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}`);
    },
};