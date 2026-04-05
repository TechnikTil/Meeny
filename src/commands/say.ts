import {
	ApplicationIntegrationType,
	Interaction,
	InteractionContextType,
	PermissionsBitField,
	SlashCommandBuilder,
} from "discord.js";
import { MeenyCommand } from "../backend/command";
import { MeenyWatcher } from "../backend/watcher";

export class SayCommand extends MeenyCommand
{
	constructor()
	{
		const command: SlashCommandBuilder = new SlashCommandBuilder();
		command.setDescription("Say a message as Meeny BETA");

		command.addStringOption(option =>
		{
			option.setName("message");
			option.setDescription("What do you want to say as Meeny BETA?");
			option.setRequired(true);
			return option;
		});

		command.setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
		command.setContexts([
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		]);

		super("say", command);
	}

	override async execute(interaction_metadata: Interaction): Promise<void>
	{
		if (!interaction_metadata.isChatInputCommand())
		{
			return;
		}

		var message: string = interaction_metadata.options.getString("message", true);

		// You can't @ everyone/here/server role if the user doesn't have the permission.
		if (
			interaction_metadata.memberPermissions != null
			&& !interaction_metadata.memberPermissions.has(PermissionsBitField.Flags.MentionEveryone)
		)
		{
			message = this.removeMentions(message);
		}

		await interaction_metadata.reply({content: "Sending Message...", flags: "Ephemeral"});

		if (interaction_metadata.channel != null && "send" in interaction_metadata.channel)
		{
			await interaction_metadata.channel.send({content: message});
		}
		else if (interaction_metadata.webhook != null)
		{
			await interaction_metadata.webhook.send({content: message});
		}
		else
		{
			await interaction_metadata.reply({content: "Could not send message properly.", flags: "Ephemeral"});
			return;
		}

		await interaction_metadata.reply({content: "Sent Message!", flags: "Ephemeral"});

		MeenyWatcher.extraText = `Message: ${message}`;
	}

	removeMentions(original: string): string
	{
		return original.split("@").join("");
	}
}
