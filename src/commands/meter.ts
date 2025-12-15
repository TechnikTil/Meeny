import { ApplicationIntegrationType, Interaction, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { MeenyCommand, RegisterCommand } from "../backend/bot";
import { MeenyWatcher } from "../backend/watcher";

@RegisterCommand
export class ChancesOfCommand extends MeenyCommand
{
	constructor()
	{
		const command: SlashCommandBuilder = new SlashCommandBuilder();
		command.setDescription("Meeny's Meter you can use to check how gay and stupid you are (The choice is yours.)");

		command.addStringOption(option =>
		{
			option.setName("meter");
			option.setDescription("What Meter do you want?");
			option.setRequired(true);
			return option;
		});

		command.addStringOption(option =>
		{
			option.setName("item");
			option.setDescription("What Item/Person/Object (you get it) do you want?");
			option.setRequired(true);
			return option;
		});

		command.setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
		command.setContexts([
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		]);

		super("meter", command);
	}

	override async execute(interaction_metadata: Interaction): Promise<void>
	{
		if (!interaction_metadata.isChatInputCommand())
		{
			return;
		}

		const meter: string = interaction_metadata.options.getString("meter");
		const item: string = interaction_metadata.options.getString("item");
		const result: number = Math.floor(Math.random() * 101);

		await interaction_metadata.reply({
			embeds: [{
				title: `Meeny's ${meter} Meter!`,
				description: `**${interaction_metadata.user}** has a **${meter}** meter at **${item}** ${result}%`,
				footer: {text: `Requested by: ${interaction_metadata.user.username}`},
			}],
		});

		MeenyWatcher.extraText = `Meter: ${meter}, Item: ${item}, Result: ${result}`;
	}
}
