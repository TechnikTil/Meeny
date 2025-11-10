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

@RegisterCommand
export class UpdatesCommand extends MeenyCommand
{
	constructor()
	{
		const command: SlashCommandBuilder = new SlashCommandBuilder();
		command.setDescription("Show's you the info of this server!");

		command.setIntegrationTypes([ApplicationIntegrationType.UserInstall]);
		command.setContexts([InteractionContextType.BotDM]);

		super("updates", command);
	}

	override async execute(interaction_metadata: Interaction): Promise<void>
	{
		if (!interaction_metadata.isChatInputCommand())
		{
			return;
		}

		const updateSelect: StringSelectMenuBuilder = new StringSelectMenuBuilder().setCustomId("updateSelect")
			.setPlaceholder("Click/Tap Me!").addOptions(
				new StringSelectMenuOptionBuilder().setLabel("Version 1").setValue("v1"),
			);

		const selection = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(updateSelect);

		const updateEmbed: EmbedBuilder = new EmbedBuilder().setTitle(`Updates`).setDescription("Select a option!")
			.setFooter({text: `Requested by: ${interaction_metadata.user.username}`});

		const updateReply: InteractionResponse = await interaction_metadata.reply({
			embeds: [updateEmbed],
			components: [selection],
		});
		const collector: InteractionCollector<StringSelectMenuInteraction> = await updateReply
			.createMessageComponentCollector({componentType: ComponentType.StringSelect});

		// Maybe use GitHub API for this instead of hardcoding it?
		collector.on("collect", async (i: StringSelectMenuInteraction) =>
		{
			if (i.customId === "updateSelect")
			{
				const value = i.values[0];

				if (value === "v1")
				{
					updateEmbed.setTitle(`V1`).setDescription(`
					## Version 1.0.0
					### Removed
					- This whole section for now
					`);
				}

				await i.update({embeds: [updateEmbed], components: [selection]});
			}
		});
	}
}
