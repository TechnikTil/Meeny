import chalk from "chalk";
import { ApplicationIntegrationType, Interaction, InteractionContextType, SlashCommandBuilder } from "discord.js";
import fs from "fs";
import { MeenyCommand } from "../backend/command";
import { MeenyWatcher } from "../backend/watcher";

export class EightBallCommand extends MeenyCommand
{
	public possibleAnswers: string[] = [];

	constructor()
	{
		const command: SlashCommandBuilder = new SlashCommandBuilder();
		command.setDescription("Meeny's 8Ball you can use to either cry or flip your desk when you see the results");

		command.addStringOption(option =>
		{
			option.setName("question");
			option.setDescription("What do you want to know?");
			option.setRequired(true);
			return option;
		});

		command.setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
		command.setContexts([
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		]);

		super("8ball", command);

		try
		{
			const data: string = fs.readFileSync("./assets/8ball/answers.txt", "utf8");
			this.possibleAnswers = data.split("\n");
		}
		catch (e)
		{
			console.log(chalk.red(`Error reading the 8ball answers: ${e}`));
			throw e;
		}
	}

	override async execute(interaction_metadata: Interaction): Promise<void>
	{
		if (!interaction_metadata.isChatInputCommand())
		{
			return;
		}

		const question: string = interaction_metadata.options.getString("question", true);
		const answer: number = Math.floor(Math.random() * this.possibleAnswers.length);

		await interaction_metadata.reply({
			embeds: [{
				title: "Meeny's 8Ball!",
				description: `**${interaction_metadata.user.username}** asked "${question}"\n And the answer is... ${
					this.possibleAnswers[answer]
				}`,
				footer: {text: `Requested by: ${interaction_metadata.user.username}`},
			}],
		});

		MeenyWatcher.extraText = `Question: ${question}, Answer: ${this.possibleAnswers[answer]}`;
	}
}
