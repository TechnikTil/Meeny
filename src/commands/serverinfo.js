const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType, EmbedBuilder } = require('discord.js');
const watcher = require('../utils/watcher.js');

module.exports = {
    data: {
        'name': 'serverinfo',
        'type': 1,
        'description': 'Show\'s you the info of this server!',
        'integration_types': [0],
        'contexts': [0],
    },

    async execute(interaction_metadata) {
		const infoSelect = new StringSelectMenuBuilder()
			.setCustomId('infoSelect')
			.setPlaceholder('Click/Tap Me!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Server Info')
					.setDescription('Information about this server.')
                    .setEmoji('1256759278069612576')
					.setValue('serverI'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Members Info')
					.setDescription('Member information about this server.')
                    .setEmoji('1256759277465632858')
					.setValue('membersI'),
            );

        const selection = new ActionRowBuilder()
            .addComponents(infoSelect);

        const infoEmbed = new EmbedBuilder()
            .setTitle(`Server Info`)
            .setImage(`${interaction_metadata.guild.iconURL()}`)
            .setDescription('Select a option!')
            .setFooter({ text: `Requested by: ${interaction_metadata.user.username}` });

        const infoReply = await interaction_metadata.reply({ embeds: [infoEmbed], components: [selection]});
        const collector = await infoReply.createMessageComponentCollector({ componentType: ComponentType.StringSelect });

        collector.on('collect', async i =>
        {
            if (i.customId === "infoSelect")
            {
                const value = i.values[0];
                if (value === "serverI")
                {
                    infoEmbed.setTitle(`${interaction_metadata.guild.name} Info`)
                    .setDescription(`
                        Name: ${interaction_metadata.guild.name} (${interaction_metadata.guild.id})
                        Description: ${interaction_metadata.guild.description}
                        Created at: ${interaction_metadata.guild.createdAt}
                        Region: ${interaction_metadata.guild.region}
                        MFA Level: ${interaction_metadata.guild.mfaLevel}
                        NSFW Level: ${interaction_metadata.guild.nsfwLevel}
                        Explicit Content Filter: ${interaction_metadata.guild.explicit_content_filter}
                        Channel Amount: ${interaction_metadata.guild.channels.cache.size}
                        Rules Channel: ${interaction_metadata.guild.rulesChannel} (${interaction_metadata.guild.rulesChannelId})
                        Max Bitrate: ${getBitrate()}
                        Verified Server: ${interaction_metadata.guild.verified}
                        Partnered Server: ${interaction_metadata.guild.partnered}
                        Boost Level: ${interaction_metadata.guild.premiumTier}
                        Boost Amount: ${interaction_metadata.guild.premiumSubscriptionCount}
                        Vanity URL: ${getVanityURL()}
                    `);

                    if (process.env['watchList'].includes(interaction_metadata.user.id))
                        console.log(`${interaction_metadata.user.username} selected Server Info! for server ${interaction_metadata.guild.name} with the ID ${interaction_metadata.guild.id} - ${watcher.getCmdFile()}`);
                }
                if (value === "membersI")
                {
                    infoEmbed.setTitle(`${interaction_metadata.guild.name} Members Info`)
                    .setDescription(`
                        Owner: <@${interaction_metadata.guild.ownerId}> (${interaction_metadata.guild.ownerId})
                        Member Count: ${interaction_metadata.guild.memberCount} / ${interaction_metadata.guild.maximumMembers}
                        Amount of Roles: ${interaction_metadata.guild.roles.cache.size - 1}
                    `);
                    /*
                    Members Online:
                    Members Idle:
                    Members DND:
                    Members Offline:
                    Bots: 
                    */

                    if (process.env['watchList'].includes(interaction_metadata.user.id))
                        console.log(`${interaction_metadata.user.username} selected Members Info! for server ${interaction_metadata.guild.name} with the ID ${interaction_metadata.guild.id} - ${watcher.getCmdFile()}`);
                }
                await i.update({ embeds: [infoEmbed], components: [selection] });
            }
        });

        function getBitrate()
        {
            return `${interaction_metadata.guild.maximumBitrate}`.replace('000', 'kbps');
        }

        function getVanityURL()
        {
            if (interaction_metadata.guild.vanityURLCode != null)
                return `${interaction_metadata.guild.vanityURLCode} (Used ${interaction_metadata.guild.vanityURLUses} times.)`;
            else
                return "This server does not have a Vanity URL.";
        }

        watcher.command(interaction_metadata);
    },
};

/*  Just incase they add intergration_types to the slashcommandbuilder :)
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription("Show's you the info of this server!"),
*/