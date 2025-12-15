import Canvas from "@napi-rs/canvas";
import chalk from "chalk";
import {
	APIApplicationCommandOptionChoice,
	ApplicationIntegrationType,
	Attachment,
	AttachmentBuilder,
	Interaction,
	InteractionContextType,
	SlashCommandBuilder,
} from "discord.js";
import fs from "fs";
import { join } from "path";
import { MeenyCommand, RegisterCommand } from "../backend/bot";
import { MeenyWatcher } from "../backend/watcher";

const iconList: CommandOptionChoices = loadIconList();

@RegisterCommand
export class AchievementCommand extends MeenyCommand
{
	constructor()
	{
		const command: SlashCommandBuilder = new SlashCommandBuilder();
		command.setDescription("Replies with a Minecraft Achievement!");

		command.addStringOption(option =>
		{
			option.setName("achievement");
			option.setDescription("What should the name of the achievement be?");
			option.setRequired(true);
			return option;
		});

		command.addStringOption(option =>
		{
			option.setName("icon");
			option.setDescription("What should the icon of the achievement be?");
			option.setRequired(false);
			option.setChoices(iconList);
			return option;
		});

		command.addAttachmentOption(option =>
		{
			option.setName("upload_icon");
			option.setDescription("Upload a custom icon for the achievement! Warning: Might look low quality!");
			option.setRequired(false);
			return option;
		});

		command.setIntegrationTypes([ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall]);
		command.setContexts([
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel,
		]);

		super("achievement", command);
	}

	override async execute(interaction_metadata: Interaction): Promise<void>
	{
		if (!interaction_metadata.isChatInputCommand())
		{
			return;
		}

		const achievement: string = interaction_metadata.options.getString("achievement");
		const icon: string = interaction_metadata.options.getString("icon");
		const customIcon: Attachment = interaction_metadata.options.getAttachment("upload_icon");

		const canvas: Canvas.Canvas = Canvas.createCanvas(1, 1);
		const context: Canvas.SKRSContext2D = canvas.getContext("2d");

		context.font = "8px \"Minecraftia\"";
		context.fillStyle = "white";
		context.imageSmoothingEnabled = false;

		const widthGeneration = Math.max(30 + context.measureText(achievement).width + 10, 160);

		canvas.width = widthGeneration;
		canvas.height = 32;

		const backgroundMiddle: Canvas.Image = await Canvas.loadImage(
			"./assets/achievement/background/background_middle.png",
		);

		for (let i = 0; i < widthGeneration - 8; i++)
		{
			context.drawImage(backgroundMiddle, 4 + i, 0);
		}

		const backgroundLeft: Canvas.Image = await Canvas.loadImage(
			"./assets/achievement/background/background_left.png",
		);
		context.drawImage(backgroundLeft, 0, 0);

		const backgroundRight: Canvas.Image = await Canvas.loadImage(
			"./assets/achievement/background/background_right.png",
		);
		context.drawImage(backgroundRight, widthGeneration - backgroundRight.width, 0);

		const achievementGet: Canvas.Image = await Canvas.loadImage("./assets/achievement/achievementGet.png");
		context.drawImage(achievementGet, 30, 7);

		context.font = "8px \"Minecraftia\"";
		context.fillStyle = "white";
		context.fillText(achievement, 30, 14 + (8 * 2));

		const attachentCanvas: Canvas.Canvas = Canvas.createCanvas(canvas.width * 2, canvas.height * 2);
		const attachentContext: Canvas.SKRSContext2D = attachentCanvas.getContext("2d");
		attachentContext.imageSmoothingEnabled = false;

		attachentContext.drawImage(
			canvas,
			0,
			0,
			canvas.width,
			canvas.height,
			0,
			0,
			attachentCanvas.width,
			attachentCanvas.height,
		);

		var achievementIcon: Canvas.Image = null;

		if (customIcon != null)
		{
			attachentContext.imageSmoothingEnabled = true;
			achievementIcon = await Canvas.loadImage(new URL(customIcon.url));
		}
		else if (icon != null)
		{
			achievementIcon = await Canvas.loadImage("./assets/achievement/icons/" + icon + ".png");
		}
		else
		{
			const randomIndex: number = Math.floor(Math.random() * iconList.length);
			achievementIcon = await Canvas.loadImage(
				"./assets/achievement/icons/" + iconList[randomIndex].value + ".png",
			);
		}

		attachentContext.drawImage(
			achievementIcon,
			16,
			16,
			Math.floor(achievementIcon.width * (32 / achievementIcon.height)),
			32,
		);

		const attachment: AttachmentBuilder = new AttachmentBuilder(attachentCanvas.toBuffer("image/png"), {
			name: "achievement.png",
		});

		await interaction_metadata.reply({files: [attachment]});

		MeenyWatcher.extraText = `Achievement: ${achievement}`;
	}
}

type CommandOptionChoices = APIApplicationCommandOptionChoice<string>[];

function loadIconList(): CommandOptionChoices
{
	try
	{
		const data: string = fs.readFileSync("./assets/achievement/icon_list.txt", "utf8");
		const iconList: CommandOptionChoices = [];

		for (const icon of data.split("\n"))
		{
			const iconSplit: string[] = icon.split("-");
			if (iconSplit.length > 1)
			{
				iconList.push({name: iconSplit[1].trim(), value: iconSplit[0].trim()});
			}
		}

		return iconList;
	}
	catch (err)
	{
		console.error(chalk.red("Error reading icon list: " + err));
		throw err;
	}
}

// load minecraftia
Canvas.GlobalFonts.registerFromPath(join(process.cwd(), "assets/achievement/minecraftia.ttf"));
