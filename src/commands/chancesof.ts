import { ApplicationIntegrationType, Interaction, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { MeenyCommand, RegisterCommand } from "../backend/bot";
import { MeenyWatcher } from "../backend/watcher";

@RegisterCommand
export class ChancesOfCommand extends MeenyCommand
{
	constructor()
	{
		const command: SlashCommandBuilder = new SlashCommandBuilder();
		command.setDescription("Chances of you using this command: 50%");

		command.addStringOption(option =>
		{
			option.setName("chance");
			option.setDescription("What do you want to test your luck on?");
			option.setRequired(true);
			return option;
		});

		command.setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
		command.setContexts([
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		]);

		super("chancesof", command);
	}

	override async execute(interaction_metadata: Interaction): Promise<void>
	{
		if (!interaction_metadata.isChatInputCommand())
		{
			return;
		}

		const chance: string = interaction_metadata.options.getString("chance");
		const result: number = Math.floor(Math.random() * 101);

		await interaction_metadata.reply({
			embeds: [{
				title: "Chances of...",
				description: `The chances of **${chance}** is **${result}%**`,
				footer: {text: `Requested by: ${interaction_metadata.user.username}`},
			}],
		});

		MeenyWatcher.extraText = `Chances of: ${chance}, Result: ${result}`;
	}
}
