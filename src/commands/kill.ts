import chalk from "chalk";
import { ApplicationIntegrationType, Interaction, InteractionContextType, SlashCommandBuilder, User } from "discord.js";
import fs from "fs";
import { MeenyCommand, RegisterCommand } from "../backend/bot";
import { MeenyWatcher } from "../backend/watcher";

@RegisterCommand
export class KillCommand extends MeenyCommand
{
	public killMessages: string[] = [];

	constructor()
	{
		const command: SlashCommandBuilder = new SlashCommandBuilder();
		command.setDescription("Meeny's 8Ball you can use to either cry or flip your desk when you see the results");

		command.addUserOption(option =>
		{
			option.setName("target");
			option.setDescription("Who do you want to kill?");
			option.setRequired(true);
			return option;
		});

		command.setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
		command.setContexts([
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		]);

		super("kill", command);

		try
		{
			const data: string = fs.readFileSync("./assets/kill/messages.txt", "utf8");
			this.killMessages = data.split("\n");
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

		const target: User = interaction_metadata.options.getUser("target");
		const response: string = this.buildKillMessage(target, interaction_metadata.user);

		await interaction_metadata.reply({
			embeds: [{
				title: "Meeny's Death Chamber",
				description: response,
				footer: {text: `Requested by: ${interaction_metadata.user.username}`},
			}],
		});

		MeenyWatcher.extraText = `Target: ${target}, Cause of death: ${response}`;
	}

	buildKillMessage(target: User, user: User): string
	{
		return this.killMessages[Math.floor(Math.random() * this.killMessages.length)].trim().split("{target}").join(
			target.toString(),
		).split("{user}").join(user.toString());
	}
}
