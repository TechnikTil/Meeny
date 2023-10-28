const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription("Show's you the info of this server!"),
    async execute(interaction) {
        // Info Menu
		const infoSelect = new StringSelectMenuBuilder()
			.setCustomId('infoSelect')
			.setPlaceholder('Click/Tap Me!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Server Info')
					.setDescription('Information about this server.')
                    .setEmoji('1167632009452064870')
					.setValue('serverI'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Members Info')
					.setDescription('Member information about this server.')
                    .setEmoji('1167627097095807067')
					.setValue('membersI'),
            );

        const row = new ActionRowBuilder()
            .addComponents(infoSelect);

        //Embeds
        const infoEmbed = new EmbedBuilder()
            .setTitle(`Server Info`)
            .setImage(`${interaction.guild.iconURL()}`)
            .setDescription('Select a option!')
            .setFooter({ text: `Requested by: ${interaction.user.username}` })

        const serverEmbed = new EmbedBuilder()
            .setTitle(`${interaction.guild.name} Info`)
            .setImage(`${interaction.guild.iconURL()}`)
            .setDescription(`
                Name: ${interaction.guild.name} (${interaction.guild.id})
                Description: ${interaction.guild.description}
                Created at: ${interaction.guild.createdAt}
                Region: ${interaction.guild.region}
                MFA Level: ${interaction.guild.mfaLevel}
                NSFW Level: ${interaction.guild.nsfwLevel}
                Rules Channel: ${interaction.guild.rulesChannel} (${interaction.guild.rulesChannelId})
                Max Bitrate: ${getBitrate()}
                Verified Server: ${interaction.guild.verified}
                Partnered Server: ${interaction.guild.partnered}
                Boost Level: ${interaction.guild.premiumTier}
                Boost Amount: ${interaction.guild.premiumSubscriptionCount}
                Vanity URL: ${getVanityURL()}
            `)
            .setFooter({ text: `Requested by: ${interaction.user.username}` })

        const membersEmbed = new EmbedBuilder()
            .setTitle(`${interaction.guild.name} Members Info`)
            .setImage(`${interaction.guild.iconURL()}`)
            .setDescription(`
                Owner: <@${interaction.guild.ownerId}> (${interaction.guild.ownerId})
                Member Count: ${interaction.guild.memberCount} / ${interaction.guild.maximumMembers}
                `)
                /*
                Members Online:
                Members Idle:
                Members DND:
                Members Offline:
                Bots: 
                */
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
                    console.log(`${interaction.user.username} selected Server Info! for server ${interaction.guild.name} with the ID ${interaction.guild.id} - serverinfo.js`)
                }
                if (value === "membersI")
                {
                    await i.update({ embeds: [membersEmbed], components: [row] });
                    console.log(`${interaction.user.username} selected Members Info! for server ${interaction.guild.name} with the ID ${interaction.guild.id} - serverinfo.js`)
                }
            }
        });

        function getBitrate()
        {
            return `${interaction.guild.maximumBitrate}`.replace('000', 'kbps');
        }

        function getVanityURL()
        {
            if (interaction.guild.vanityURLCode != null)
                return `${interaction.guild.vanityURLCode} (Used ${interaction.guild.vanityURLUses} times.)`;
            else
                return "This server does not have a Vanity URL.";
        }

        console.log(`Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}`);
    },
};