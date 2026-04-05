import chalk from "chalk";
import {
	ActivityType,
	Client,
	GatewayIntentBits,
	Interaction,
	REST,
	RESTPostAPIChatInputApplicationCommandsJSONBody,
	Routes,
	SlashCommandBuilder,
} from "discord.js";
import { format } from "node:util";
import commandClasses from "../commands";
import { MeenyEnvironment } from "./botenv";
import { MeenyCommand } from "./command";
import { MeenyWatcher } from "./watcher";

export var botEnv: MeenyEnvironment = new MeenyEnvironment();

export class MeenyBot
{
	static commandEntries: Map<string, MeenyCommand> = new Map<string, MeenyCommand>();

	public static client: Client;
	public static rest: REST;

	public static async initialize(): Promise<void>
	{
		MeenyBot.client = new Client({
			intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
		});

		MeenyBot.rest = new REST({version: "10"});
		MeenyBot.rest.setToken(botEnv.token);

		await MeenyBot.updateCommands();

		MeenyBot.client.once("clientReady", () =>
		{
			if (!MeenyBot.client.user) return;
			console.log(chalk.green(`${MeenyBot.client.user.tag} is now online!`));

			MeenyBot.client.user.setActivity("with your mom/dad lol", {type: ActivityType.Playing});
			MeenyBot.client.user.setStatus("dnd");
		});

		MeenyBot.client.on("interactionCreate", MeenyBot.onInteraction);

		await MeenyBot.client.login(botEnv.token);
	}

	public static async onInteraction(interaction_metadata: Interaction): Promise<void>
	{
		if (botEnv.banList.includes(interaction_metadata.user.id) && interaction_metadata.isRepliable())
		{
			await interaction_metadata.reply({content: botEnv.banMessage, flags: "Ephemeral"});
			return;
		}

		if (!interaction_metadata.isChatInputCommand() || interaction_metadata.replied || interaction_metadata.deferred)
		{
			return;
		}

		const command: MeenyCommand | undefined = MeenyBot.commandEntries.get(interaction_metadata.commandName);

		if (command == null)
		{
			console.error(chalk.red(`No command matching ${interaction_metadata.commandName} was found.`));
			return;
		}

		try
		{
			await command.execute(interaction_metadata);
			MeenyWatcher.command(interaction_metadata);
		}
		catch (e)
		{
			console.error(e);

			const message: string = "There was an error running your command properly!\n\nStack below:```" + format(e)
				+ "```";

			await interaction_metadata.reply({content: message, flags: "Ephemeral"});
		}
	}

	static async updateCommands(): Promise<void>
	{
		const commandData: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

		for (const commandClass of commandClasses)
		{
			const command = new commandClass("unknown", new SlashCommandBuilder());
			const name = command.name;
			const data = command.data;

			if (!name || !data)
			{
				throw new Error(`Data fields for ${commandClass.name} are undefined!`);
			}

			MeenyBot.commandEntries.set(name, command);
			const jsonData: RESTPostAPIChatInputApplicationCommandsJSONBody = data.toJSON();
			commandData.push(jsonData);
		}

		await MeenyBot.rest.put(Routes.applicationCommands(botEnv.id), {body: commandData});
	}
}
