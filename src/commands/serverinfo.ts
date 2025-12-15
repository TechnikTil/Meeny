import {
	ActionRowBuilder,
	ApplicationIntegrationType,
	ComponentType,
	EmbedBuilder,
	Interaction,
	InteractionCollector,
	InteractionContextType,
	InteractionResponse,
	MessageActionRowComponentBuilder,
	SlashCommandBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuInteraction,
	StringSelectMenuOptionBuilder,
} from "discord.js";
import { MeenyCommand, RegisterCommand } from "../backend/bot";
import { MeenyWatcher } from "../backend/watcher";

@RegisterCommand
export class ServerInfoCommand extends MeenyCommand
{
	constructor()
	{
		const command: SlashCommandBuilder = new SlashCommandBuilder();
		command.setDescription("Show's you the info of this server!");

		command.setIntegrationTypes([ApplicationIntegrationType.GuildInstall]);
		command.setContexts([InteractionContextType.Guild]);

		super("serverinfo", command);
	}

	override async execute(interaction_metadata: Interaction): Promise<void>
	{
		if (!interaction_metadata.isChatInputCommand())
		{
			return;
		}

		const infoSelect: StringSelectMenuBuilder = new StringSelectMenuBuilder().setCustomId("infoSelect")
			.setPlaceholder("Click/Tap Me!").addOptions(
				new StringSelectMenuOptionBuilder().setLabel("Server Info").setDescription(
					"Information about this server.",
				).setEmoji("1300614237604941887").setValue("serverI"),
				new StringSelectMenuOptionBuilder().setLabel("Members Info").setDescription(
					"Member information about this server.",
				).setEmoji("1300614216889270392").setValue("membersI"),
			);

		const selection: ActionRowBuilder<MessageActionRowComponentBuilder> = new ActionRowBuilder<
			MessageActionRowComponentBuilder
		>().addComponents(infoSelect);

		const infoEmbed: EmbedBuilder = new EmbedBuilder().setTitle(`Server Info`).setImage(
			`${interaction_metadata.guild.iconURL()}`,
		).setDescription("Select a option!").setFooter({text: `Requested by: ${interaction_metadata.user.username}`});

		const infoReply: InteractionResponse = await interaction_metadata.reply({
			embeds: [infoEmbed],
			components: [selection],
		});
		const collector: InteractionCollector<StringSelectMenuInteraction> = infoReply.createMessageComponentCollector({
			componentType: ComponentType.StringSelect,
		});

		collector.on("collect", async (i: StringSelectMenuInteraction) =>
		{
			if (i.customId === "infoSelect")
			{
				const value: string = i.values[0];
				if (value === "serverI")
				{
					infoEmbed.setTitle(`${interaction_metadata.guild.name} Info`).setDescription(`
						Name: ${interaction_metadata.guild.name} (${interaction_metadata.guild.id})
						Description: ${interaction_metadata.guild.description}
						Created at: ${interaction_metadata.guild.createdAt}
						MFA Level: ${interaction_metadata.guild.mfaLevel}
						NSFW Level: ${interaction_metadata.guild.nsfwLevel}
						Channel Amount: ${interaction_metadata.guild.channels.cache.size}
						Rules Channel: ${interaction_metadata.guild.rulesChannel} (${interaction_metadata.guild.rulesChannelId})
						Max Bitrate: ${getBitrate()}
						Verified Server: ${interaction_metadata.guild.verified}
						Partnered Server: ${interaction_metadata.guild.partnered}
						Boost Level: ${interaction_metadata.guild.premiumTier}
						Boost Amount: ${interaction_metadata.guild.premiumSubscriptionCount}
						Vanity URL: ${getVanityURL()}
					`);

					MeenyWatcher.customWatchLog(
						`${interaction_metadata.user.username} selected Server Info! - Server ${interaction_metadata.guild.name} with the ID ${interaction_metadata.guild.id}`,
						interaction_metadata,
					);
				}
				else if (value === "membersI")
				{
					infoEmbed.setTitle(`${interaction_metadata.guild.name} Members Info`).setDescription(`
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

					MeenyWatcher.customWatchLog(
						`${interaction_metadata.user.username} selected Members Info! - Server ${interaction_metadata.guild.name} with the ID ${interaction_metadata.guild.id}`,
						interaction_metadata,
					);
				}
				await i.update({embeds: [infoEmbed], components: [selection]});
			}
		});

		function getBitrate(): string
		{
			return `${interaction_metadata.guild.maximumBitrate}`.replace("000", "kbps");
		}

		function getVanityURL(): string
		{
			if (interaction_metadata.guild.vanityURLCode != null)
			{
				return `${interaction_metadata.guild.vanityURLCode} (Used ${interaction_metadata.guild.vanityURLUses} times.)`;
			}
			else
			{
				return "This server does not have a Vanity URL.";
			}
		}
	}
}
