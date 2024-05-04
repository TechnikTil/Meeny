const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType, EmbedBuilder } = require('discord.js');
const watcher = require('../utils/watcher.js');

module.exports = {
    data: {
        'name': 'updates',
        'type': 1,
        'description': 'Shows you what changed in Meeny!',
        'integration_types': [1],
        'contexts': [1],
    },

    async execute(interaction_metadata) {
		const updateSelect = new StringSelectMenuBuilder()
			.setCustomId('updateSelect')
			.setPlaceholder('Click/Tap Me!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Version 1')
					//.setDescription('')
					.setValue('v1')
                    //.setDefault(true),
            );

        const selection = new ActionRowBuilder()
            .addComponents(updateSelect);

        const updateEmbed = new EmbedBuilder()
            .setTitle(`Updates`)
            .setDescription('Select a option!')
            .setFooter({ text: `The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) | Requested by: ${interaction_metadata.user.username}` });

        const updateReply = await interaction_metadata.reply({ embeds: [updateEmbed], components: [selection]});
        const collector = await updateReply.createMessageComponentCollector({ componentType: ComponentType.StringSelect });

        collector.on('collect', async i =>
        {
            if(i.customId === "updateSelect")
            {
                const value = i.values[0];
                if (value === "v1")
                {
                    updateEmbed.setTitle(`V1`)
                    .setDescription(`
                    ## Version 1.0.0
                    ### Removed
                    - This whole section for now
                    `)
                }

                await i.update({ embeds: [updateEmbed], components: [selection] });

                if (process.env['watchList'].includes(interaction_metadata.user.id))
                    console.log(`${interaction_metadata.user.username} selected ${value} - ${watcher.getCmdFile()}`);
            }
        });

        watcher.command(interaction_metadata);
    },
};

/*  Just incase they add intergration_types to the slashcommandbuilder :)
    data: new SlashCommandBuilder()
        .setName('updates')
        .setDescription("Shows you what changed in Meeny!"),
*/