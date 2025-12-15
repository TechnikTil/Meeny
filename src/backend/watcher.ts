import chalk from "chalk";
import { Interaction } from "discord.js";
import { botEnv } from "./bot";

export class MeenyWatcher
{
	public static extraText: string = null;

	public static command(interaction: Interaction): void
	{
		if (!interaction.isCommand() || !botEnv.watchList.includes(interaction.user.id.toString()))
		{
			return;
		}

		var watcherText: string = `Command: ${interaction.commandName}, Ran by: ${interaction.user.tag}`;
		if (MeenyWatcher.extraText != null)
		{
			watcherText += `, ${MeenyWatcher.extraText}`;
			MeenyWatcher.extraText = null;
		}

		MeenyWatcher.customWatchLog(watcherText, interaction);
	}

	public static customWatchLog(text: string, interaction: Interaction): void
	{
		if (!interaction.isCommand() || !botEnv.watchList.includes(interaction.user.id.toString()))
		{
			return;
		}

		console.log(chalk.cyan(text));
	}
}
