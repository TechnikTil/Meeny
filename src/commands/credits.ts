import chalk from "chalk";
import { ApplicationIntegrationType, Interaction, InteractionContextType, SlashCommandBuilder } from "discord.js";
import fs from "fs";
import { MeenyCommand, RegisterCommand } from "../backend/bot";

@RegisterCommand
export class CreditsCommand extends MeenyCommand
{
	creditsEmbed: any[];

	constructor()
	{
		const command: SlashCommandBuilder = new SlashCommandBuilder();
		command.setDescription("All of the people who worked/helped making this bot");

		command.setIntegrationTypes([ApplicationIntegrationType.UserInstall]);
		command.setContexts([InteractionContextType.BotDM]);

		super("credits", command);

		try
		{
			const data: string = fs.readFileSync("./assets/credits/embed.json", "utf8");
			this.creditsEmbed = JSON.parse(`{"credits": ${data}}`).credits;
		}
		catch (e)
		{
			console.log(chalk.red(`Error reading credits embed: ${e}`));
			throw e;
		}
	}

	override async execute(interaction_metadata: Interaction): Promise<void>
	{
		if (!interaction_metadata.isChatInputCommand())
		{
			return;
		}

		await interaction_metadata.reply({embeds: this.creditsEmbed});
	}
}
