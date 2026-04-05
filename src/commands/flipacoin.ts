import { ApplicationIntegrationType, Interaction, InteractionContextType, SlashCommandBuilder } from "discord.js";
import { MeenyCommand } from "../backend/command";
import { MeenyWatcher } from "../backend/watcher";

export class FlipACoinCommand extends MeenyCommand
{
	constructor()
	{
		const command: SlashCommandBuilder = new SlashCommandBuilder();
		command.setDescription("Flipping a coin to get either heads or tails.");

		command.addStringOption(option =>
		{
			option.setName("reason");
			option.setDescription("What is the reason for doing this?");
			option.setRequired(true);
			return option;
		});

		command.setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
		command.setContexts([
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		]);

		super("flipacoin", command);
	}

	override async execute(interaction_metadata: Interaction): Promise<void>
	{
		if (!interaction_metadata.isChatInputCommand())
		{
			return;
		}

		const reason: string = interaction_metadata.options.getString("reason", true);
		const result: string = (Math.random() < 0.5) ? "Heads" : "Tails";

		await interaction_metadata.reply({
			embeds: [{
				title: "Flip a Coin",
				description: `Flipped a coin for **${reason}**\nIt landed on... **${result}**`,
				footer: {text: `Requested by: ${interaction_metadata.user.username}`},
			}],
		});

		MeenyWatcher.extraText = `Reason: ${reason}, Result: ${result}`;
	}
}
