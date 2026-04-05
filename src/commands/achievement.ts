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
import sharp, { Metadata, OutputInfo, OverlayOptions, Sharp } from "sharp";
import { Readable } from "stream";
import { MeenyCommand } from "../backend/command";
import { MeenyWatcher } from "../backend/watcher";

const charSize: number = 8;
const gridCount: number = 16;

const iconList: CommandOptionChoices = loadIconList();

const fontSheetBuffer: Buffer = fs.readFileSync("assets/achievement/ascii.png");
const {data: fontData, info: fontInfo} = await sharp(fontSheetBuffer).raw().toBuffer({resolveWithObject: true});

const achievementGetBuffer: Buffer = fs.readFileSync("assets/achievement/achievementGet.png");
const achievementGetData = await sharp(achievementGetBuffer).raw().toBuffer({resolveWithObject: true});

const achievementBackground: Sharp[] = ["left", "middle", "right"].map(suffix =>
	sharp(`assets/achievement/background/background_${suffix}.png`)
);
const backgroundMetadatas: Metadata[] = await Promise.all(achievementBackground.map(image => image.metadata()));
const backgroundBuffers: {data: Buffer; info: OutputInfo;}[] = await Promise.all(
	achievementBackground.map(image => image.raw().toBuffer({resolveWithObject: true})),
);

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

		const achievement: string = interaction_metadata.options.getString("achievement", true);
		const icon: string | null = interaction_metadata.options.getString("icon");
		const customIcon: Attachment | null = interaction_metadata.options.getAttachment("upload_icon");

		const {textWidth, textLayers} = constructText(achievement, [30, 18]);

		const width: number = Math.max(textWidth + 40, 160);
		const height: number = 32;

		const backgroundLayers: OverlayOptions[] = await constructBackground(width);

		const achievementGetLayer: OverlayOptions = {
			input: achievementGetData.data,
			raw: achievementGetData.info,
			left: 30,
			top: 7,
		};

		const achievementBuffer = await sharp({
			create: {width, height, channels: 4, background: {r: 0, g: 0, b: 0, alpha: 0}},
		}).composite([...backgroundLayers, ...textLayers, achievementGetLayer]).raw().toBuffer({
			resolveWithObject: true,
		});

		const achievementImage: Sharp = sharp(achievementBuffer.data, {raw: achievementBuffer.info}).resize(
			width * 4,
			height * 4,
			{kernel: "nearest"},
		);

		const iconLayer: OverlayOptions = await constructIcon(icon ?? customIcon);
		achievementImage.composite([iconLayer]);

		const attachment: AttachmentBuilder = new AttachmentBuilder(await achievementImage.png().toBuffer(), {
			name: "achievement.png",
		});
		await interaction_metadata.reply({files: [attachment]});

		MeenyWatcher.extraText = `Achievement: ${achievement}`;
	}
}

type CommandOptionChoices = APIApplicationCommandOptionChoice<string>[];

interface CharMetrics
{
	width: number;
	leftOffset: number;
	pixelWidth: number;
}

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

async function constructBackground(width: number): Promise<OverlayOptions[]>
{
	const [leftBuffer, middleBuffer, rightBuffer] = backgroundBuffers;
	const [leftMetadata, middleMetadata, rightMetadata] = backgroundMetadatas;

	const middleWidth: number = width - leftMetadata.width - rightMetadata.width;
	const tiledMiddleBuffer: Buffer = await sharp({
		create: {
			width: middleWidth,
			height: middleMetadata.height,
			channels: 4,
			background: {r: 0, g: 0, b: 0, alpha: 0},
		},
	}).composite([{input: middleBuffer.data, raw: middleBuffer.info, tile: true}]).ensureAlpha().raw().toBuffer();

	return [
		{
			input: tiledMiddleBuffer,
			raw: {width: middleWidth, height: middleMetadata.height, channels: 4},
			left: leftMetadata.width,
			top: 0,
		},
		{input: leftBuffer.data, raw: leftBuffer.info, left: 0, top: 0},
		{input: rightBuffer.data, raw: rightBuffer.info, left: width - rightMetadata.width, top: 0},
	];
}

function constructText(achievement: string, textOffset: number[]): {textWidth: number; textLayers: OverlayOptions[];}
{
	const textLayers: OverlayOptions[] = [];
	let textWidth: number = 0;

	for (const char of achievement.split(""))
	{
		const charCode: number = char.charCodeAt(0);
		const row: number = Math.floor(charCode / gridCount);
		const col: number = charCode % gridCount;

		const buffer: Buffer = getCharBuffer(col, row);
		const metrics: CharMetrics = getCharMetrics(buffer);
		const trimmedBuffer: Buffer = trimCharBuffer(buffer, metrics);

		textLayers.push({
			input: trimmedBuffer,
			raw: {width: metrics.pixelWidth, height: charSize, channels: 4},
			left: textOffset[0] + textWidth,
			top: textOffset[1],
		});

		textWidth += metrics.width;
	}

	return {textLayers, textWidth};
}

async function constructIcon(icon: string | Attachment | null): Promise<OverlayOptions>
{
	if (!icon)
	{
		const randomIndex: number = Math.floor(Math.random() * iconList.length);
		icon = iconList[randomIndex].value;
	}

	let bufferOutput: {data: Buffer; info: OutputInfo;};

	if (icon instanceof Attachment)
	{
		const response: Response = await fetch(icon.url);
		if (!response.body) throw "Could not fetch attachment. That's not good!";

		const image: Sharp = sharp().resize(64, 64, {fit: "inside", kernel: "nearest"});
		const nodeStream: Readable = Readable.fromWeb(response.body as any);
		bufferOutput = await nodeStream.pipe(image).ensureAlpha().raw().toBuffer({resolveWithObject: true});
	}
	else
	{
		const image: Sharp = sharp(`assets/achievement/icons/${icon}.png`).resize(64, 64, {
			fit: "inside",
			kernel: "nearest",
		});
		bufferOutput = await image.ensureAlpha().raw().toBuffer({resolveWithObject: true});
	}

	const left: number = 32 + Math.floor((64 - bufferOutput.info.width) / 2);
	const top: number = 32 + Math.floor((64 - bufferOutput.info.height) / 2);

	return {input: bufferOutput.data, raw: bufferOutput.info, left, top};
}

function getCharBuffer(col: number, row: number): Buffer
{
	const out: Buffer = Buffer.alloc(charSize * charSize * 4);

	for (let y = 0; y < charSize; y++)
	{
		for (let x = 0; x < charSize; x++)
		{
			const srcX: number = col * charSize + x;
			const srcY: number = row * charSize + y;
			const srcI: number = (srcY * fontInfo.width + srcX) * 4;
			const dstI: number = (y * charSize + x) * 4;
			fontData.copy(out, dstI, srcI, srcI + 4);
		}
	}

	return out;
}

function getCharMetrics(charBuffer: Buffer): CharMetrics
{
	let minLeft: number = charSize;
	let maxRight: number = -1;

	for (let x = 0; x < charSize; x++)
	{
		for (let y = 0; y < charSize; y++)
		{
			const i: number = ((y * charSize + x) * 4) + 3;
			if (charBuffer[i] > 0)
			{
				if (x < minLeft) minLeft = x;
				if (x > maxRight) maxRight = x;
			}
		}
	}

	if (maxRight === -1) return {width: 4, leftOffset: 0, pixelWidth: 1};

	const pixelWidth: number = (maxRight - minLeft) + 1;
	return {pixelWidth, leftOffset: minLeft, width: pixelWidth + 1};
}

function trimCharBuffer(buffer: Buffer, metrics: CharMetrics): Buffer
{
	const out: Buffer = Buffer.alloc(metrics.pixelWidth * charSize * 4);
	for (let y = 0; y < charSize; y++)
	{
		for (let x = 0; x < metrics.pixelWidth; x++)
		{
			const srcI: number = (y * charSize + x + metrics.leftOffset) * 4;
			const dstI: number = (y * metrics.pixelWidth + x) * 4;
			buffer.copy(out, dstI, srcI, srcI + 4);
		}
	}
	return out;
}
