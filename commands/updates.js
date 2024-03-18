const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('updates')
        .setDescription("Shows you what changed in Meeny!"),
    async execute(interaction) {
        // Update Menu
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

        const row = new ActionRowBuilder()
            .addComponents(updateSelect);

        //Embeds
        const updateEmbed = new EmbedBuilder()
            .setTitle(`Updates`)
            .setDescription('Select a option!')
            .setFooter({ text: `Requested by: ${interaction.user.username}` })

        const v1embed = new EmbedBuilder()
            .setTitle(`Version 1`)
            .setDescription(`
            ## Version 1.0.0
            - (+) Added **Ping** Command \`/ping\`
            - (+) Added **Meter** Command \`/meter <meter> <item>\`
            - (+) Added **Credits** \`/credits\`
            - (+) Added **Socials** \`/socials\`
            - (+) Added **Achievement** Command \`/achievement <achievement>\`
            - (+) Added **8Ball** Command \`/8ball <question>\`
            - (+) Added **Chances of** Command \`/chancesof <chance>\`
            - (+) Added **Say** Command \`/say <message>\`
            - (+) Added **Server Info** Command \`/serverinfo\`
            - (+) Added **Updates** Command \`/updates\`
            - (+) Added **Kill** Command \`/kill  <target>\`
            - (+) Added Block System
            - (+) Added Self Commands
            `)
            .setFooter({ text: `Requested by: ${interaction.user.username}` })

        const updateReply = await interaction.reply({ embeds: [updateEmbed], components: [row]});

        const collector = await updateReply.createMessageComponentCollector({ componentType: ComponentType.StringSelect });

        collector.on('collect', async i => {
            if(i.customId === "updateSelect")
            {
                const value = i.values[0];
                if (value === "v1")
                {
                    await i.update({ embeds: [v1embed], components: [row] });
                    console.log(`${interaction.user.username} selected Version 1! - updates.js`)
                }
            }
        });

        console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}`);
    },
};