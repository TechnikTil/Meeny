import { ApplicationIntegrationType, Interaction, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { MeenyCommand, RegisterCommand } from "../backend/bot";

@RegisterCommand
export class SocialCommand extends MeenyCommand
{
	constructor()
	{
		const command: SlashCommandBuilder = new SlashCommandBuilder();
		command.setDescription("All of Meeny's Social Media (Stuff like Twitter and whatever)");

		command.setIntegrationTypes([ApplicationIntegrationType.UserInstall]);
		command.setContexts([InteractionContextType.BotDM]);

		super("socials", command);
	}

	override async execute(interaction_metadata: Interaction): Promise<void>
	{
		if (!interaction_metadata.isChatInputCommand())
		{
			return;
		}

		await interaction_metadata.reply({
			embeds: [{
				title: "Meeny's Socials",
				description: "Click a button below to visit any one of meeny's socials.",
			}],
			components: [{
				type: 1,
				components: [{
					type: 2,
					label: "GitHub (Source Code)",
					style: 5,
					url: "https://github.com/MeenyDiscord/Meeny/tree/Meeny-BETA",
					emoji: {name: "github", id: "1300614258790367232"},
				}, {
					type: 2,
					label: "Twitter (also known as X)",
					style: 5,
					url: "https://twitter.com/MeenyDiscord",
					emoji: {name: "twitter", id: "1300614248476708884"},
				}],
			}],
		});
	}
}
