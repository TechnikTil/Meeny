import chalk from "chalk";
import {
	ActivityType,
	CacheType,
	Client,
	GatewayIntentBits,
	Interaction,
	RepliableInteraction,
	REST,
	RESTPostAPIChatInputApplicationCommandsJSONBody,
	Routes,
	SlashCommandBuilder,
} from "discord.js";
import { format } from "node:util";
import { MeenyEnvironment } from "./botenv";
import { MeenyWatcher } from "./watcher";

export var botEnv: MeenyEnvironment = new MeenyEnvironment();

export class MeenyBot
{
	static commandClasses: typeof MeenyCommand[] = [];
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

		MeenyBot.client.once("ready", () =>
		{
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

		if (!interaction_metadata.isChatInputCommand())
		{
			return;
		}

		const command: MeenyCommand = MeenyBot.commandEntries.get(interaction_metadata.commandName);

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
			await interaction_metadata.reply({
				content: "There was an error running your command properly!\n\nStack below:```" + format(e) + "```",
				flags: "Ephemeral",
			});
			return;
		}
	}

	static async updateCommands(): Promise<void>
	{
		const commandData: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

		for (const commandClass of MeenyBot.commandClasses)
		{
			const command = new commandClass(undefined, undefined);
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

	public static registerCommand(command: typeof MeenyCommand): void
	{
		MeenyBot.commandClasses.push(command);
	}
}

export function RegisterCommand<T extends typeof MeenyCommand>(cls: T): T
{
	MeenyBot.registerCommand(cls);
	return cls;
}

export class MeenyCommand
{
	public name: string;
	data: SlashCommandBuilder;

	constructor(name: string, data: SlashCommandBuilder)
	{
		this.name = name;
		this.data = data;

		this.data.setName(this.name);
	}

	async execute(interaction_metadata: Interaction): Promise<void>
	{
		throw new Error("The `execute` function for " + this.name + " must be overriden!");
	}
}
